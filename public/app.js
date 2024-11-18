const socket = io();

// Select elements
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const messagesDiv = document.getElementById('messages');

// Listen for incoming chat messages
socket.on('chat message', (msg) => {
  const messageElement = document.createElement('p');
  messageElement.textContent = msg;
  messagesDiv.appendChild(messageElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;  // Scroll to the bottom
});

// Send message when the button is clicked
sendBtn.addEventListener('click', () => {
  const message = chatInput.value.trim();
  if (message) {
    socket.emit('chat message', message);
    chatInput.value = '';  // Clear the input after sending
  }
});

// Send message when "Enter" key is pressed
chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendBtn.click();
  }
});
