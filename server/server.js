// server.js

const express = require('express');
const SocketServer = require('ws');
const uuidv4 = require('uuid/v4');
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.broadcast = function(data) {
  wss.clients.forEach(sock => {
    console.log("got message")
    if (sock.readyState === SocketServer.OPEN) {
      // console.log("incoming data", data)
      // const parsedData = uuidv4()
      const parsedData = JSON.parse(data);
      const returnData = Object.assign({id:uuidv4()},parsedData);
      sock.send(JSON.stringify(returnData));
    } else {
      sock.terminate();
    }
  });
}

wss.on('connection', (socket, req) => {
  console.log('welcome to the server');
  console.log(req.connection.remoteAddress);
  socket.on('message', wss.broadcast);
  socket.on('close', () => console.log('Client disconnected'));
});
