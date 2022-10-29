import Router from 'koa-router';
import checkLoggedIn from '../../lib/checkLoggedIn.js';
import * as userCtrl from './user.ctrl.js';

const user = new Router();

user.patch('/:id', checkLoggedIn, userCtrl.updateUser);
user.delete('/:id', checkLoggedIn, userCtrl.deleteUser);
user.get('/', checkLoggedIn, userCtrl.getUserfriend);
user.put('/:id/follow', checkLoggedIn, userCtrl.follow);
user.put('/:id/unfollow', checkLoggedIn, userCtrl.unfollow);

export default user;
