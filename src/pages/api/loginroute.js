import connectdb from "../../../config/config"
import User from "../../../Models/usermodel";
import bcrypt from 'bcryptjs';
import cookie from 'cookie';
import jwt from "jsonwebtoken"

connectdb();

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    const { password, email } = await req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found!" });
        }
        const comp = await bcrypt.compare(password, user.password);
        if (!comp) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.setHeader('Set-Cookie', cookie.serialize('token', token, {
            httpOnly: false,
            maxAge: 3600,
            sameSite: 'lax',
            path: '/',
            secure: process.env.NODE_ENV === 'production'
        }));

        return res.status(201).json({ success: true, message: "Welcome to LinkHub", user: user })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}