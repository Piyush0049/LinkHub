import Post from "../../../../Models/postmodel";
import connectdb from "../../../../config/config";
import User from "../../../../Models/usermodel";
import jwt from "jsonwebtoken";

connectdb();

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }

    try {
        const { id } = req.body;
        const { token } = req.cookies;
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verify._id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        user.bookmarked = user.bookmarked.filter(book => book.toString() !== id.toString());
        user.posts = user.posts.filter(post => post.toString() !== id.toString());

        await user.save();

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        // Remove post ID from all users who bookmarked the post
        const bookedusersarray = post.allbookmarked;
        for (let i = 0; i < bookedusersarray.length; i++) {
            const userdet = await User.findById(bookedusersarray[i]);

            if (userdet) {
                userdet.bookmarked = userdet.bookmarked.filter(book => book.toString() !== id.toString());
                await userdet.save();
            }
        }

        // Finally, delete the post from the database
        await Post.findByIdAndDelete(id);

        return res.status(200).json({ success: true, message: "Post deleted successfully", user });
    } catch (error) {
        console.error("Error deleting post:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}
