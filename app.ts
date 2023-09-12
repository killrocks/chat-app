import { Server } from 'socket.io';
import express from 'express';
import path from 'path';

const app = express();

const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log(`Listening to port ${port}`));

const io = new Server(server);
let socketConnected = new Set();

io.on('connection', (socket) => {
    console.log('socketId', socket.id);
    const socketId = socket.id;
    socketConnected.add(socketId);
    console.log('users connected: ', socketConnected.size);


    io.emit('clientsTotal', socketConnected.size);

    socket.on('disconnect', () => {
        console.log('socket disconnected', socket.id);
        socketConnected.delete(socket.id);
        io.emit('clientsTotal', socketConnected.size);
    })

    socket.on('message', (data) => {
        console.log('data', data);
        socket.broadcast.emit('message', data);
    })
})

app.use(express.static(path.join(__dirname, 'public')));

