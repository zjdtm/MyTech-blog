import Router from 'koa-router';
import * as conversationCtrl from './conversation.ctrl.js';

const conversation = new Router();

conversation.post('/', conversationCtrl.postConverSation);
conversation.get('/:userId', conversationCtrl.getConverSation);

export default conversation;
