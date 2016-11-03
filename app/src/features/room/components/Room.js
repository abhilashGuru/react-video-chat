import React, { Component } from 'react';
import RoomLayout from './RoomLayout';
let Promise = require('es6-promise').Promise;
import * as actions from '../duck';
import { connect } from 'react-redux'

class Room extends Component {

  componentDidMount() {
    let roomName = this.props.params.roomName;
    this.props.joinRoom(roomName);
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