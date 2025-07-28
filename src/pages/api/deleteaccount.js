import connectdb from "../../../config/config";
import cookie from 'cookie';
import User from "../../../Models/usermodel";
import Post from "../../../Models/postmodel";
import jwt from "jsonwebtoken";

connectdb();

export default async function handler(req, res) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    try {
        const { token } = cookie.parse(req.headers.cookie || '');
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken._id;

        const deletedUser = await User.findById(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove user's bookmarks from posts
        const deletedBookmarks = deletedUser.bookmarked;
        for (let i = 0; i < deletedBookmarks.length; i++) {
            const postId = deletedBookmarks[i];
            const post = await Post.findById(postId);
            if (post) {
                post.allbookmarked = post.allbookmarked.filter(book => book.toString() !== userId.toString());
                await post.save();
            }
        }

        // Delete user's posts and update other users' bookmarks
        const deletedPosts = deletedUser.posts;
        for (let i = 0; i < deletedPosts.length; i++) {
            const post = await Post.findById(deletedPosts[i]);
                // Remove deleted user from other users' bookmarks
                const bookedUsers = post.allbookmarked;
                for (let y = 0; y < bookedUsers.length; y++) {
                    const user = await User.findById(bookedUsers[y]);
                    if (user) {
                        user.bookmarked = user.bookmarked.filter(book => book.toString() !== deletedPosts[i].toString());
                        await user.save();
                    }
                }
                // Delete the post itself
                await Post.findByIdAndDelete(deletedPosts[i]);
        }
    
        const deletedfollowers = deletedUser.followers;
        for(let i=0; i<deletedfollowers.length; i++){
            const user= await User.findById(deletedfollowers[i]);
            user.following = user.following.filter(following => following.toString() !== userId.toString());
            await user.save();
        }

        const deletedfollowing = deletedUser.following;
        for(let i=0; i<deletedfollowing.length; i++){
            const user = await User.findById(deletedfollowing[i]);
            user.followers = user.followers.filter(follower=> follower.toString() !== userId.toString());
            await user.save();
        }

        await User.findByIdAndDelete(userId);

        res.setHeader('Set-Cookie', cookie.serialize('token', '', {
            httpOnly: true,
            maxAge: 0,
            sameSite: 'lax',
            path: '/',
            secure: process.env.NODE_ENV === 'production'
        }));

        return res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error('Delete account error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
