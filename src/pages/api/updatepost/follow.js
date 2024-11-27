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
        const me = await User.findById(verify._id);
        const followeduser = await User.findById(identity);

        followeduser.followers.push(me._id);
        me.following.push(followeduser._id);
        followeduser.notifications.push({user : me, status: "followed" });
        await me.save();
        await followeduser.save();
        return res.status(201).json({success : true, message : "Followed successfully", me, followeduser})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success : false, message : "Internal server error"})
    }
    
}