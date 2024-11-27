import Post from "../../../Models/postmodel";
import User from "../../../Models/usermodel";
import connectdb from "../../../config/config";
import jwt from "jsonwebtoken";

connectdb();

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }

    try {
        const { token } = req.body;
        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        const verify = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verify._id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let allUsersIds = await User.find().select('_id');
        allUsersIds = allUsersIds.map(user => user._id.toString());

        const followingIds = user.following.map(id => id.toString());
        const unfollowedUserIds = allUsersIds.filter(id => !followingIds.includes(id) && id !== user._id.toString());

        function getRandomItems(arr, numItems) {
            let copiedArray = arr.slice();

            for (let i = copiedArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [copiedArray[i], copiedArray[j]] = [copiedArray[j], copiedArray[i]];
            }

            return copiedArray.slice(0, numItems);
        }

        const randomUnfollowedUsers = getRandomItems(unfollowedUserIds, 5);

        let allUnfollowedUsers = [];
        for (const userId of randomUnfollowedUsers) {
            const user = await User.findById(userId);
            allUnfollowedUsers.push(user);
        }

        return res.status(200).json({ success: true, suggestedUsers: allUnfollowedUsers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}
