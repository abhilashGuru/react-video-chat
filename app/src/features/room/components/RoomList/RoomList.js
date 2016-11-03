import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../duck';
import RoomListLayout from './RoomListLayout';

class RoomList extends Component {
  render() {
    let {rooms} = this.props;
    return (
      <RoomListLayout
        rooms={rooms}
        activeRoom={activeRoom}
        isShowing={roomListVisibility}>
      </RoomListLayout>
    )
  }
}

const mapStateToThis = (state) => {
  return {
    rooms: state.rooms,
    activeRoom: state.activeRoom,
    roomListVisibility: state.roomListVisibility
  }
}

const mapDispatchToThis = (dispatch) => {
  return {
    hideRoomList: () => dispatch(actions.setRoomListVisibility(false)),
    removeRoom: (room) => dispatch(actions.removeRoom(room.id)),
    setActiveRoom: (room) => dispatch(actions.setActiveRoomByName(room.name))
  }
}