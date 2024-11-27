import connectdb from "../../../config/config"
import cookie from 'cookie';

connectdb();

export default async function handler(req, res) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    try {
        res.setHeader('Set-Cookie', cookie.serialize('token', '', {
            httpOnly: false,
            maxAge: 0,
            sameSite: 'lax',
            path: '/',
            secure: process.env.NODE_ENV === 'production'
        }));
        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}