import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema({
  content: String,
  from: Object,
  socketId: String,
  time: String,
  date: String,
  to: String,
});

const Message = mongoose.model('Message', MessageSchema);
export default Message;
