import Router from 'koa-router';
import checkLoggedIn from '../../lib/checkLoggedIn.js';
import * as postsCtrl from './posts.ctrl.js';

const posts = new Router();

posts.get('/', postsCtrl.list);
posts.post('/', checkLoggedIn, postsCtrl.write);

const post = new Router();
post.get('/', postsCtrl.read);
post.delete('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.remove);
post.patch('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.update);
post.put('/like', checkLoggedIn, postsCtrl.like);

posts.use('/:id', postsCtrl.getPostById, post.routes());
export default posts;
