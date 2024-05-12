import { io } from 'socket.io-client';

const joinRoomButton = document.getElementById('join-button');

const messageInput = document.getElementById('message-input');
const roomInput = document.getElementById('room-input');
const nameInput = document.getElementById('name-input');

let name = 'guest';

const form = document.getElementById('form');

const socket = io('http://localhost:3000');
socket.on('connect', () => {
  displayMessage(name, `You connected with socket id: ${socket.id}`);
});


socket.on("receive-message", (name, message) => {
  displayMessage(name, message);
});

joinRoomButton.addEventListener('click', () => {
  const room = roomInput.value;
  socket.emit('join-room', room, message => {
    noNameMessage(message);
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  const room = roomInput.value;
  name = nameInput.value;

  if (message === '') return;
  displayMessage(name, message)
  socket.emit('sent-message', name, message, room);

  messageInput.value = '';
});

function displayMessage(name, message) {
  const messageElement = document.createElement('div');
  messageElement.textContent = ` ${name}: ${message}`;
  messageElement.id = 'new-message';
  document.getElementById('message-container').append(messageElement);
}

function noNameMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.textContent = `${message}`;
  messageElement.id = 'new-message';
  document.getElementById('message-container').append(messageElement);
}