import React, { Component } from 'react';
import RoomLayout from './RoomLayout';
let Promise = require('es6-promise').Promise;
import * as actions from '../duck';
import { connect } from 'react-redux'

class Room extends Component {

  componentDidMount() {
    let roomName = this.props.params.roomName;
    this.props.joinRoom(roomName);
    // this.chatService = new ChatService();
    // chatService
    //   .joinRoom(this.props.roomName)
    //   .on('isReady', () => {
    //     dispatch(this.props.setRoomStatus());
    //     dispatch(this.props.addRoom(this.props.roomName));
    //   })
    //   .on('connecting', (room) => {
    //     // thêm room vào danh sách
    //     dispatch(this.props.setRoomStatus());
    //   })
    //   .on('cameraReady', () => {
    //     dispatch(this.props.setRoomStatus());
    //   })
    //   .on('newJoiner', () => {
    //     // thêm user vào danh sách
    //   })
    //   .on('userExit', (userId) => {
    //     // remove user id from room after 3 secs
    //   })
    //   .on('newMessage', (user, message, response) => {
    //     if (response.success) {
    //       dispatch(this.props.addMessage(user, message));
    //     } else {
    //       dispatch(this.props.messageError());
    //     }
    //   })
    //   .on('end', () => {

    //   })

  }

  render() {

    return (
      <RoomLayout/>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    joinRoom: (roomName) => dispatch(actions.joinRoom(roomName))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);