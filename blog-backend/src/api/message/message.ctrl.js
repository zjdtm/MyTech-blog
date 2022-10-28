import Message from '../../models/message.js';

export const postMessage = async (ctx) => {
  const newMessage = new Message(ctx.request.body);

  try {
    const savedMessage = await newMessage.save();
    ctx.status = 200;
    ctx.body = savedMessage;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const getMessage = async (ctx) => {
  try {
    const messages = await Message.find({
      conversationId: ctx.params.conversationId,
    });
    ctx.status = 200;
    ctx.body = messages;
  } catch (e) {
    ctx.throw(500, e);
  }
};
