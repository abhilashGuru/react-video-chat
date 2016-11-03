import React, { Component } from 'react';
import WebcamViewer from './WebcamViewer/WebcamViewer';
import UserContainer from './UserContainer/UserContainer';

export default class RoomLayout extends Component {
  render() {
    return (
      <div className="room-page">
        <UserContainer></UserContainer>
      </div>
    );
  }
}