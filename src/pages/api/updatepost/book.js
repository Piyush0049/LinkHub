import Post from "../../../../Models/postmodel";
import User from "../../../../Models/usermodel";
import connectdb from "../../../../config/config";
import jwt from "jsonwebtoken";

connectdb();

export default async function handler(req, res){
    try {
        if(req.method!=="PUT"){
            return res.status(400).json({success : false, message : "Method not allowed!"})
        }
        const {token} = req.cookies;
        const {identity} = req.body;
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verify._id)
        const post = await Post.findById(identity);
        post.allbookmarked.push(user._id);
        const postofuser = await User.findById(post.author);
        postofuser.notifications.push({user : user, status: "booked" });
        user.bookmarked.push(identity);
        await user.save();
        await postofuser.save();
        await post.save();
        console.log(user)
        return res.status(201).json({success : true, message : "Post bookmark updated successfully", data : post})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success : false, message : "Internal server error"})
    }
    
}