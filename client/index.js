// const form = document.getElementById('chat-form');
// const messageBox = document.getElementById('messageBox');
// const chatBox = document.getElementById('chat-box')

// const socket = io('localhost:8181');


// socket.on('message' , (data) => {
//     console.log("player ", data.player);
//     const liTag = document.createElement('li');
//     liTag.classList.add('list-group-item');
//     liTag.innerText = data.message;

//     chatBox.appendChild(liTag);
// })

// form.addEventListener('submit', e => {
//     e.preventDefault();
//     console.log(messageBox.value)
//     socket.emit('humus', messageBox.value)
//     messageBox.value = ''
// })
