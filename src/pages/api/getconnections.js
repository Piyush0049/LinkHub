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

        const followers = [];
        const following = [];

        for(let i=0; i< user.followers.length; i++){
            const a = await User.findById(user.followers[i]);
            followers.push(a);
        }

        for(let i=0; i< user.following.length; i++){
            const a = await User.findById(user.following[i]);
            following.push(a);
        }


        return res.status(200).json({ 
            success: true,
            followers : followers,
            following : following
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}
