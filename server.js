'use strict';

var os = require('os');
var nodeStatic = require('node-static');
var http = require('http');
var socketIO = require('socket.io');

var fileServer = new(nodeStatic.Server)();
var express = require('express');
var app = express();

var server = http.createServer(app);

server.listen(8080, '127.0.0.1');

var io = socketIO.listen(server, {
  log: false,
  origins: 'http://localhost:* http://localhost:3000'
});


app.get('/', function (req, res) {
  res.status(200).send();
});


io.sockets.on('connection', function(socket) {

  // convenience function to log server messages on the client
  function log() {
    var array = ['Message from server:'];
    console.log(arguments);
    array.push.apply(array, arguments);
    socket.emit('log', array);
  }

  socket.on('message', function(message) {
    log('Client said: ', message);
    // for a real app, would be room-only (not broadcast)
    socket.broadcast.emit('message', message);
  });

  socket.on('create or join', function(data, fn) {
    let roomName = data.roomName;
    log('Received request to create or join room ' + roomName);
    log('Received data:', data);
    var numClients = io.sockets.sockets.length;
    log('Room ' + roomName + ' now has ' + numClients + ' client(s)');

    if (numClients === 1) {
      socket.join(roomName);
      log('Client ID ' + socket.id + ' created room ' + roomName);

      fn({
        isHost: true,
        success: true
      });

    } else if (numClients < 8) {
      log('Client ID ' + socket.id + ' joined room ' + roomName);
      io.sockets.in(roomName).emit('newJoiner', {
        roomName,
        user: {
          peerId: data.peerId
        }
      });
      socket.join(roomName);
      fn({
        isHost: false,
        success: true
      });
    } else { // max two clients
      fn({
        success: false,
        message: 'room.is.full'
      });
    }
  });

  socket.on('ipaddr', function() {
    var ifaces = os.networkInterfaces();
    for (var dev in ifaces) {
      ifaces[dev].forEach(function(details) {
        if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
          socket.emit('ipaddr', details.address);
        }
      });
    }
  });

  socket.on('bye', function() {
    console.log('received bye');
  });

  socket.on('setPeerId', function(message) {
    console.log('receive peer id', message);
    socket.broadcast.emit('peer', message);
  });

});
