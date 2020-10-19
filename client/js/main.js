const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');

const socket = io('localhost:8181');

const {username, room} = Qs.parse(location.search, { ignoreQueryPrefix: true });


//TODO: Make users list show on left side
//TODO: Make socket not break/ disconnect for user on refresh only on leave


socket.on('message', (message) => {
    // console.log(message);
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
    console.log(data.room);

    roomName.innerText = data.room.charAt(0).toUpperCase()+ data.room.slice(1);

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
