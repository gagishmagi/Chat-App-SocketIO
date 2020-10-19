const express = require('express');
const http = require('http');
const socket = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(express.static(path.join(__dirname,'..' ,'client')));

const formatMessage = require('./utils/messages');

const { userJoin, getRoomsUser } = require('./utils/users');

const BotName = 'Chat Bot'

io.on('connection', socket => {

    socket.on('userJoin', ({ username, room }) => {
        console.log(socket.id);
        console.log(username);
        console.log(room);
        const user  = userJoin( socket.id, username, room );

        socket.join(user.room);

        // Send message only to the current socket
        socket.emit('message', formatMessage(BotName, 'Wellcome to ChatApp'))

        socket.broadcast.to(user.room).emit('message', formatMessage(BotName, `${user.username} added to ChatApp`))

        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomsUser(user.room)
        })

    })


    socket.on('chatMessage', (data) => {
        // console.log(data),
        io.emit('message', formatMessage(data.user,data.message))
    });

    socket.on('disconnect', () => {
        // console.log('user disconnected');
        io.emit('message', formatMessage('Username', 'has disconnected from the chat'))
    });
})


const PORT  = process.env.PORT || 8181;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
