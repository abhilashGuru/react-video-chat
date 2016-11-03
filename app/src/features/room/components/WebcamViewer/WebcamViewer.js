import React, { Component } from 'react';
import WebcamViewerLayout from './WebcamViewerLayout';

export default class WebcamViewer extends Component {
  render() {
    let {stream} = this.props;
    let streamUrl = URL.createObjectURL(stream);
    return (
      <WebcamViewerLayout src={streamUrl}/>
    )
  }
}

WebcamViewer.defaultsProps = {
  streamUrl: null
}