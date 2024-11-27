import connectdb from "../../../config/config";
import jwt from "jsonwebtoken"

connectdb();

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(400).json({ success: false, message: "Method not allowed" });
    }
    try {
        const { id } = req.body;
        const { token } = req.cookies;
        const data = jwt.verify(token, process.env.JWT_SECRET);
        if (data._id !== id) {
            return res.status(201).json({ same: false });
        } else {
            return res.status(201).json({ same: true });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}


