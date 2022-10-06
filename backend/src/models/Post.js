import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        title : {
            type : String,
            require : true,
            unique : true
        },
        desc : {
            type : String,
            require : true
        },
        tags : {
            type:[String],
            require : true
        }
    },
    {timestamps : true}
);

const Post = mongoose.model('Post', PostSchema);
export default Post;