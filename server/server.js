const {instrument} = require('@socket.io/admin-ui');

const io = require('socket.io')(3000, {
    cors: {
        origin: ['http://localhost:8080', "https://admin.socket.io"]
    },
})

io.on('connection', socket => {
    console.log(socket.id)
    console.log('-----------------------')
    socket.on('sent-message', (name, message, room) => {
        if (room === '') {
            socket.broadcast.emit('receive-message', name, message)
            console.log(`${name}: ${message}`);
        } else {
            socket.to(room).emit('receive-message', name, message)
        }
    })
    socket.on('join-room', (room, cb) => {
        socket.join(room);
        cb(`You joined room: ${room}`);
    })
});

// admin dashboard
//http://localhost:3000/admin
instrument(io, {auth: false})