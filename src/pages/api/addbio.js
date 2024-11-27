import connectdb from "../../../config/config"
import User from "../../../Models/usermodel";
import jwt from "jsonwebtoken"

connectdb();

export default async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { bio } = req.body;

    console.log(bio)

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
        user.bio = bio;

        await user.save();

        console.log(user)
        return res.status(200).json({ success: true, message: "User updated successfully", user });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}
