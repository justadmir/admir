const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Initialize the app and the server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (HTML, CSS, JS) from the "public" folder
app.use(express.static('public'));

// Handle new connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for incoming chat messages from clients
  socket.on('chat message', (msg) => {
    // Emit the message to all clients
    io.emit('chat message', msg);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
