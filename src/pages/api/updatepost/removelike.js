import Post from "../../../../Models/postmodel";
import User from "../../../../Models/usermodel";
import connectdb from "../../../../config/config";
import jwt from "jsonwebtoken";

connectdb();

export default async function handler(req, res) {
    try {
        if (req.method !== "PUT") {
            return res.status(400).json({ success: false, message: "Method not allowed!" });
        }

        const { token } = req.cookies;
        const { identity } = req.body;

        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided!" });
        }

        const verify = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verify._id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        const post = await Post.findById(identity);

        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found!" });
        }

        const userIdString = verify._id.toString();
        post.alllikes = post.alllikes.filter(like => like.toString() !== userIdString);
        const postofuser = await User.findById(post.author);
        postofuser.notifications = postofuser.notifications.filter(notification => 
            !(notification.user.toString() === user.toString() && notification.status === "liked")
        );

        await postofuser.save();
        await post.save();

        return res.status(201).json({ success: true, message: "Post like updated successfully", data: post });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}
