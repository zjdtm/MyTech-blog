import Router from 'koa-router';
import * as messageCtrl from './message.ctrl.js';

const message = new Router();

message.post('/', messageCtrl.postMessage);

export default message;
