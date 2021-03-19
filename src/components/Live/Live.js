import React from 'react';
import ReactTwitchEmbedVideo from 'react-twitch-embed-video';
import './Live.css';

const Live = () => {
  return (
    <div className="container">
      <ReactTwitchEmbedVideo height="754" width="100%" channel="Gaules" />
    </div>
  );
};

export default Live;
