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
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        const me = await User.findById(verify._id);


        me.followers = me.followers.filter(follow => follow.toString() !== identity.toString());

        await me.save();
        return res.status(201).json({ success: true, message: "following removed successfully", me });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}
