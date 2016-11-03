let io = require('socket.io-client');
let peer = require('peerjs');
let socket = io.connect('http://localhost:8080');
let instance = null;

export default getChatService = (serverUrl, peerServerId) => {
  if (!instance) {
    instance = new ChatService(serverUrl, peerServerId);
  }
  return instance;
}

class ChatService {

  constructor(serverUrl, peerServerId) {
    this.socket = io.connect(serverUrl);
    this.peer = new Peer(peerServerId);

    peer.on('open', peerId => {
      this.peerId = peerId;
      this.isPeerReady = true;
      // TODO: dispatch peer ready action
    });

    socket.on('newJoiner', data => {
      console.log('New joiner');
      this.call = peer.call(data.user.peerId);
      // TODO: add user to room
      this.startCall(this.call, data.user);
    });

    peer.on('call', call => {
      console.log('Receive call');
      // set room status
      //
    });
  }

  joinRoom(roomName) {
    socket.emit('create or join', roomName, (response) => {
      console.log(response);
    });
  }

  startCall(call, user) {
    call.on('stream', stream => {
      // set user stream and status
    })
  }



}
