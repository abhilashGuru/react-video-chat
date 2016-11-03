import React, { Component } from 'react';
import WebcamViewerLayout from './WebcamViewerLayout';

export default class WebcamViewer extends Component {
  render() {
    let {streamUrl} = this.props;
    return (
      <WebcamViewerLayout src={streamUrl}/>
    )
  }
}

WebcamViewer.defaultsProps = {
  streamUrl: null
}