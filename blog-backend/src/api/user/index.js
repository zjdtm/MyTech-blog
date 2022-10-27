import Router from 'koa-router';
import checkLoggedIn from '../../lib/checkLoggedIn.js';
import * as userCtrl from './user.ctrl.js';

const user = new Router();

user.put('/:id', checkLoggedIn, userCtrl.updateUser);
user.delete('/:id', checkLoggedIn, userCtrl.deleteUser);
user.get('/:id', checkLoggedIn, userCtrl.getUser);
user.post('/:id', checkLoggedIn, userCtrl.follow);
user.post('/:id', checkLoggedIn, userCtrl.unfollow);

export default user;
