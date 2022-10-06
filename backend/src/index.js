import dotenv from 'dotenv';
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import api from './api/index.js';

dotenv.config();
const app = new Koa();
const router = new Router();
const { MONGO_URL } = process.env;

router.use('/api', api.routes());

mongoose.connect(MONGO_URL, {})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(e => {
        console.log(e);
});

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
    console.log("Listening to port 4000 ");
});