import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema(
  {
    title: String,
    body: String,
    tags: [String],
    likes: [String],
    user: {
      _id: mongoose.Types.ObjectId,
      username: String,
    },
  },
  { timestamps: true },
);

const Post = mongoose.model('Post', PostSchema);
export default Post;
