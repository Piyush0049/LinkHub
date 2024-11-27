import User from "../../../Models/usermodel";
import connectdb from "../../../config/config";
import jwt from "jsonwebtoken";

connectdb();

export default async function handler(req, res) {
    try {
        if (req.method !== "PUT") {
            return res.status(400).json({ success: false, message: "Method not allowed!" });
        }

        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided!" });
        }

        const verify = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verify._id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        user.notifications = [];
        await user.save();

        console.log(user)

        return res.status(201).json({ success: true, message: "Notifications updated successfully", user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}
