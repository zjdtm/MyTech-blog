import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema(
  {
    // back-end, front-end, community
    conversationId: String,
    sender: String,
    text: String,
  },
  { timestamps: true },
);

const Message = mongoose.model('Message', MessageSchema);
export default Message;
