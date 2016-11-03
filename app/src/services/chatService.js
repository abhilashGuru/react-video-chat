let io = require('socket.io-client');
let Peer = require('peerjs');
let socket = io.connect('http://localhost:8080');
let instance = null;
let config = require('../config/config.json');
let Promise = require('es6-promise').Promise;

class ChatService {

  constructor(serverUrl, peerServerId) {
    this.serverUrl = serverUrl;
    this.peerServerId = peerServerId;

    this.socket = io.connect(serverUrl);

    this.events = {};
    this.calls = {};
  }

  init() {
    this.peer = new Peer({key: this.peerServerId});

    this.peer.on('open', peerId => {
      this.peerId = peerId;
      this.isPeerReady = true;
      this.publish('ready');
    });

    socket.on('newJoiner', data => {
      console.log('New joiner');
      var call = this.createCall(data.user.peerId);
      // TODO: add user to room
      this.startCall(call, data.user);
      this.publish('newJoiner', data.user);
    });

    this.peer.on('call', call => {
      console.log('Receive call');
      call.answer(this.localStream);
      call.on('stream', stream => {

      })
    });

    return this;
  }

  joinRoom(roomName) {
    this.roomName = roomName;

    socket.emit('create or join', {
      roomName,
      peerId: this.peerId
    }, (response) => {
      console.log(response);
      if (response.success) {
        this.isHost = response.isHost;
        this.publish('connected', {
          isHost: this.isHost,
          peerId: this.peerId
        });
      } else {
        console.log('Can not connect');
      }
    });
  }

  getLocalStream() {
    return new Promise((resolve, reject) => {
      return navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: true
        })
        .then(stream => {
          this.localStream = stream;
          resolve(stream);
        }, err => {
          reject(err);
        });
    });

  }

  startCall(call, user) {
    call.on('stream', stream => {
      console.log('receive stream');
      // set user stream and status
      this.publish('newJoinerReady', stream);
    });
  }

  createCall(peerId) {
    this.calls[peerId] = this.peer.call(peerId, this.localStream);
    return this.calls[peerId];
  }

  on(event, callback) {
    this.events[event] = callback;
    return this;
  }

  publish(event, data) {
    let callback = this.events[event]
    if (!callback) {
      console.log('Call back %s is not register', event);
      return;
    }
    callback(data);
  }
}

export default function getChatService() {
  if (!instance) {
    instance = new ChatService(config.CHAT_SERVER_URL, config.PEER_SERVER_ID);
  }
  return instance;
}


