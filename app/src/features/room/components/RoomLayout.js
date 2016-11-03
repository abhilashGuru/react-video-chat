import React, { Component } from 'react';
import WebcamViewer from './WebcamViewer/WebcamViewer';

export default class RoomLayout extends Component {
  render() {
    return (
      <div className="room-page">
        <WebcamViewer streamUrl={this.props.localStreamUrl} />
      </div>
    );
  }
}