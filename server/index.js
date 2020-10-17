const http = require('http');
const socket = require('socket.io');

const server = http.createServer();
const io = socket(server);

let cnt = 0;

io.on('connection', socket => {
    cnt++;
    console.log(`Player${cnt} has joined the chat`)
    console.log(`New WS Connection`);


    socket.broadcast.emit('message', { message: `Player${cnt} have successfully joined the chat`, player: cnt})

    socket.on('humus', (msg) => {
        io.emit('message', { message: msg})
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
        io.emit('message',`Player${cnt} has disconnected from the chat`)
    });
})



server.listen(8181, () => console.log("Servier is running on port 8181"))
