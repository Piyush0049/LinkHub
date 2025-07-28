import connectdb from "../../../config/config";
import Post from "../../../Models/postmodel";
import User from "../../../Models/usermodel";
import jwt from "jsonwebtoken";

connectdb();

export default async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { image } = req.body;

    if (!image) {
        return res.status(400).json({ success: false, message: "Image not provided" });
    }

    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({ success: false, message: "Token not found" });
        }

        const data = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(data._id);
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found!" });
        }

        user.profileImage = image;

        await Promise.all(user.posts.map(async (postId) => {
            const post = await Post.findById(postId);
            if (post && post.authordetails) {
                post.authordetails.profileImage = image;
            }
            await post.save();
        }));

        await user.save();

        const updatedUser = await User.findById(data._id);

        return res.status(200).json({ success: true, message: "User updated successfully", user: updatedUser });

    } catch (error) {
        console.error("Error updating profile image:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}
