import Post from "../../../Models/postmodel";
import User from "../../../Models/usermodel";
import connectdb from "../../../config/config";
import jwt from "jsonwebtoken";

connectdb();

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(400).json({ success: false, message: "Method not allowed" });
    }
    try {
        const { mediaUrl, content } = req.body;
        const { token } = req.cookies;
        const data = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(data._id);
        console.log(user);
        const post = new Post({
            mediaUrl: mediaUrl,
            content: content,
            author: data._id,
            authordetails : user
        })
        console.log(post)
        await post.save();
        user.posts.push(post._id);
        await user.save();
        return res.status(201).json({ success: true, message: "Post has been created successfully", post });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}


