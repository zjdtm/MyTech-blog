import Router from 'koa-router';
import posts from './posts/index.js';
import auth from './auth/index.js';
import user from './user/index.js';
import conversation from './conversation/index.js';
import message from './message/index.js';
const api = new Router();

api.use('/posts', posts.routes());
api.use('/auth', auth.routes());
api.use('/user', user.routes());
api.use('/conversation', conversation.routes());
api.use('/messages', message.routes());

export default api;
