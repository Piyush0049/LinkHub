import Post from "../../../Models/postmodel";
import User from "../../../Models/usermodel";
import connectdb from "../../../config/config";
import jwt from "jsonwebtoken";

connectdb();

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }

    try {
        const { token } = req.body;
        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        const verify = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verify._id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let bookedposts = [];
        for (const post of user.bookmarked) {
            const book = await Post.findById(post);
            if (book) {
                bookedposts.push(book);
            }
        }

        const allposts = await Post.find();
        const likedPosts = [];
        const bookmarked = [];


        for (const post of allposts) {
            if (post.author.toString() === verify._id.toString()) {
                post.authordetails = user;
                await post.save();
            }
            for (let i = 0; i < post.comments.length; i++) {
                if (post.comments[i].user._id.toString() === verify._id.toString()) {
                    post.comments[i].user = user;
                    await post.save();
                }
            }
            if (post.alllikes.some(like => like.toString() === verify._id.toString())) {
                likedPosts.push(post._id);
            }
            if (post.allbookmarked.some(bookmark => bookmark.toString() === verify._id.toString())) {
                bookmarked.push(post._id);
            }
        }

        const notificationsbyusers = await Promise.all(
            user.notifications.map(async notification => {
                const notifyuser = await User.findById(notification.user);
                return { notifyuser, status: notification.status, createdAt: notification.createdAt };
            })
        );

        const users = await User.find();

        return res.status(200).json({
            success: true,
            posts: allposts,
            likedPosts,
            bookmarked,
            Userdetails: user,
            allusers: users,
            notificationsbyusers,
            bookedposts
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}
