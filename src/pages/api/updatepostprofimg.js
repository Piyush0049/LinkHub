import connectdb from '../../../config/config';
import User from '../../../Models/usermodel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cookie from 'cookie';

connectdb();

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { image } = req.body;

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ success: false, message: 'Email is already in use' });
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ success: false, message: 'This username has already been taken' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      name,
      password: hashedPassword,
      email,
    });

    await user.save();

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.setHeader('Set-Cookie', cookie.serialize('token', token, {
      httpOnly: false,
      maxAge: 3600, 
      sameSite: 'lax',
      path: '/', 
      secure: process.env.NODE_ENV === 'production'
    }));

    return res.status(201).json({
      token,
      user: { name: user.name, username: user.username, email: user.email }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
