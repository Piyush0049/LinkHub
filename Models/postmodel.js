import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    mediaUrl: {
        type: String,
        required: false,
        default: '',
    },
    content: {
        type: String,
        required: true,
    },
    comments: [{
        user: { type: Object, required: true },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    authordetails : {
        type : Object,
        required : true,
    },
    alllikes : [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
    }],
    allbookmarked : [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export default Post;
