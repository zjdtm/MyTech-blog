import Router from 'koa-router';
import * as conversationCtrl from './conversation.ctrl.js';

const conversation = new Router();

conversation.post('/', conversationCtrl.postConverSation);

export default conversation;
