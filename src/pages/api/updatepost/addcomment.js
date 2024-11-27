import Post from "../../../../Models/postmodel";
import User from "../../../../Models/usermodel";
import connectdb from "../../../../config/config"
import jwt from "jsonwebtoken"

connectdb();

export default async function handler(req, res) {
    
    try {
        if (req.method !== "PUT") {
            return res.status(400).json({ success: false, message: "Method not allowed!" });
        }
        const { comment, identity } = req.body;
        const post = await Post.findById(identity);
        const { token } = req.cookies;
        const data = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(data._id);
        console.log(user)
        const commentdetails = {
            user: user,
            content: comment,
        }
        post.comments.push(commentdetails);
        const postofuser = await User.findById(post.author);
        postofuser.notifications.push({user : user, status: "commented" });
        await postofuser.save();
        await post.save();
        return res.status(201).json({success : true, post : post})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }

}