import Conversation from '../../models/conversation.js';

export const postConverSation = async (ctx) => {
  console.log(ctx.request.body);
  const { senderId, receiverId } = ctx.request.body;
  const newConversation = new Conversation({
    members: [senderId, receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    ctx.status = 200;
    ctx.body = savedConversation;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const getConverSation = async (ctx) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [ctx.params.userId] },
    });
    ctx.status = 200;
    ctx.body = conversation;
  } catch (e) {
    ctx.throw(500, e);
  }
};
