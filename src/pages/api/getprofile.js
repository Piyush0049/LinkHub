import connectdb from '../../../config/config';
import User from '../../../Models/usermodel';
import jwt from 'jsonwebtoken';
import Post from '../../../Models/postmodel';

connectdb();

export default async function handler(req, res) {
  try {
    const {id, token} = req.body; 
    
    if (!token) {
      return res.status(401).json({ success: false, message: "Token not found" });
    }
    
    if (!id) {
      return res.status(401).json({ success: false, message: "id not found" });
    }


    const data = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(id);
    const currentuser = await User.findById(data._id);

    if (!user) {
      return res.status(400).json({ success: false, message: "User does not exist" });
    }

    let route = false;

    if(id.toString()===user._id.toString()){
      route=true;
    }
    const postid = user.posts;

    const allposts = [];

    for(let i=0; i< postid.length; i++){
      const post = await Post.findById(postid[i]);
      allposts.push(post);
    }
    const profileimg = currentuser.profileImage;

    const allusers = await User.find();

    let cond = false;

    if(user.followers.includes(currentuser._id)){
      cond = true
    }
    
    return res.status(200).json({ success: true, message: "User found successfully", data: user, allposts, profileimg, allusers, cond : cond, route : route });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}
