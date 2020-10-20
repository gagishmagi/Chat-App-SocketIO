const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const usersList = document.getElementById('users');
const disconnectBtn = document.getElementById('discon');

let socket;

// console.log(typeof socket);

// if (localStorage.length == 0) {
    socket = io('localhost:8181');

    // var socketConnection = io.connect('localhost:8181');
    // socketConnection.on('connect', function () {
    //     const sessionID = socketConnection.socket.sessionid; //
    //     console.log(sessionID)
    // });

    // localStorage.setItem('socket_id', socket.connect().id);
    // console.log(socket.id);
// }else{
    // socket.id = localStorage.getItem('socket_id');
// }
// localStorage.getItem('socket_id');


const {username, room} = Qs.parse(location.search, { ignoreQueryPrefix: true });


//TODO: Make users list show on left side
//TODO: Make socket not break/ disconnect for user on refresh only on leave


socket.on('message', (message) => {
    console.log(message);
    outputMessage(message)

    //scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

socket.emit('userJoin', {
    username,
    room
});

// // Message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = e.target.elements.msg.value;
    // console.log(msg)
    //sending a message to the server
    socket.emit('chatMessage',{ user: username , message:msg } );

    //clear input and focus
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

socket.on('roomUsers' , (data) => {
    roomName.innerText = data.room.charAt(0).toUpperCase()+ data.room.slice(1);

    usersList.innerHTML = '';

    data.users.forEach( (user) => {
        const li = document.createElement('li');
        li.innerText = user.username;
        usersList.appendChild(li);
    });

});


function outputMessage(data){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML =
    `<p class="meta">${data.username} <span>${data.time}</span></p>
     <p class="text">
       ${data.text}
     </p>
     `;
    chatMessages.appendChild(div);
}

disconnectBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    socket.emit('disconnect');
    location.href = 'index.html';
})
