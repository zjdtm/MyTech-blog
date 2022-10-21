import mongoose from 'mongoose';

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    title: String,
    body: String,
    tags: [String],
    user: {
      _id: mongoose.Types.ObjectId,
      username: String,
    },
  },
  { timestamps: true },
);

const Post = mongoose.model('Post', PostSchema);
export default Post;
