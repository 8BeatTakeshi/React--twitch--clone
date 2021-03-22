import React, { useState, useEffect } from 'react';
import ReactTwitchEmbedVideo from 'react-twitch-embed-video';
/* useParams: This hook gives us access to the params of that particular route. params
are parameters whose values are set dynamically in a URL.
Usually, the way we access the params in previous versions of react-router
was through the match props passed to the component. */
import { useParams } from 'react-router-dom';
import api from '../../api';
import './Live.css';

const Live = () => {
  let { slug } = useParams();

  const [infoStream, setInfoStream] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(
        `https://api.twitch.tv/helix/streams?user_login=${slug}`
      );
      // Check if streamer is online
      result.data.data.length === 0
        ? setInfoStream(false)
        : setInfoStream(result.data.data[0]);
    };

    fetchData();
  }, [slug]);

  return infoStream ? (
    <div className="container">
      <ReactTwitchEmbedVideo height="754" width="100%" channel={slug} />
      <div className="container_info">
        <div className="container_info_title">{infoStream.title}</div>
        <div className="container_info_viewer">
          Viewers : {infoStream.viewer_count}
        </div>
        <div className="container_info_streamer">
          Streamer : {infoStream.user_name}, &nbsp; Langue :{' '}
          {infoStream.language}
        </div>
        <div className="container_info_game">Jeu : {infoStream.game_name}</div>
      </div>
    </div>
  ) : (
    <div className="container">
      <ReactTwitchEmbedVideo height="754" width="100%" channel={slug} />
      <div className="container_info">
        <div className="container_info_title">Le streamer est offline!</div>
      </div>
    </div>
  );
};

export default Live;
