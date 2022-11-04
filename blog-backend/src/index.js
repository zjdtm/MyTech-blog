import dotenv from 'dotenv';
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import mongoose from 'mongoose';
import api from './api/index.js';
import jwtMiddleware from './lib/jwtMiddleware.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import Message from './models/message.js';
import User from './models/user.js';

dotenv.config();
const { PORT, MONGO_URI } = process.env;
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.error(e);
  });

const app = new Koa();
const router = new Router();

router.use('/api', api.routes());

app.use(bodyParser());
app.use(cors());
app.use(jwtMiddleware);

app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000;

const httpServer = createServer(app.callback());

httpServer.listen(port, () => {
  console.log(`Listening to port ${port}`);
});

async function getLastMessagesFromRoom(room) {
  let roomMessages = await Message.aggregate([
    { $match: { to: room } },
    { $group: { _id: '$date', messagesByDate: { $push: '$$ROOT' } } },
  ]);
  return roomMessages;
}

/* 02/11/2022
      ↓
   20220211
*/
function sortRoomMessagesByDate(messages) {
  return messages.sort(function (a, b) {
    let date1 = a._id.split('/');
    let date2 = b._id.split('/');

    date1 = date1[2] + date1[0] + date1[1];
    date2 = date2[2] + date2[0] + date2[1];

    return date1 < date2 ? -1 : 1;
  });
}

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});

io.on('connection', (socket) => {
  socket.on('new-user', async () => {
    const members = await User.find();
    io.emit('new-user', members);
  });

  socket.on('join-room', async (room) => {
    socket.join(room);
    let roomMessages = await getLastMessagesFromRoom(room);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    socket.emit('room-messages', roomMessages);
  });

  socket.on('message-room', async (content, sender, time, date, room) => {
    const newMessage = await Message.create({
      content,
      from: sender,
      time,
      date,
      to: room,
    });
    let roomMessages = await getLastMessagesFromRoom(room);
    roomMessages = sortRoomMessagesByDate(roomMessages);

    io.to(room).emit('room-messages', roomMessages);

    socket.broadcast.emit('alarmOn', room);
  });
});
