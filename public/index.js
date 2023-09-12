// import io from 'socket.io-client';

const socket = io();

const clientsTotal = document.getElementById('clientsTotal');

const messageContainer = document.getElementById('messageContainer');
const nameInput = document.getElementById('nameInput');
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');

messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    sendMessage();
});



socket.on('clientsTotal', (data) => {
    clientsTotal.innerText = `Users in chat: ${data}`;
})

const sendMessage = () => {
    console.log(messageInput.value);
    const data = {
        name: nameInput.value,
        message: messageInput.value,
        timestamp: new Date().toLocaleTimeString(),
    };
    socket.emit('message', data);
    addMessageUI(true, data);
    messageInput.value = '';
}

socket.on('message', (data) => {
    addMessageUI(false, data);
    console.log('data from server', data);
});

const addMessageUI = (ownMessage, data) => {
    const element = `<li class="${ownMessage ? "messageLeft" : "messageRight"}">
    <p class="message">
        <span>${data.name}
        </span>
        ${data.message}
        <span>• ${data.timestamp}</span>
    </p>
</li>`

    messageContainer.innerHTML += element;
}
