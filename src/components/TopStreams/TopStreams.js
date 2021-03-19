import React, { useEffect, useState } from 'react';
import api from '../../api';
import './TopStreams.css';

const TopStreams = () => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Get Streams
      const result = await api.get('https://api.twitch.tv/helix/streams');

      // Array of informations about active streams
      let dataArray = result.data.data;

      // Array of users id's (needed to retrieve players login + thumbnail)
      let userIds = dataArray.map((stream) => {
        return stream.user_id;
      });

      // Create custom URL to retrieve all users informations
      let baseUrlUsers = 'https://api.twitch.tv/helix/users?';

      let queryParamsUser = '';

      userIds.map((id) => {
        return (queryParamsUser = queryParamsUser + `id=${id}&`);
      });

      let finalUrlUsers = baseUrlUsers + queryParamsUser;

      // API call
      let getUsers = await api.get(finalUrlUsers);

      let usersArray = getUsers.data.data;

      // Create final array
      let finalArray = dataArray.map((stream) => {
        stream.login = '';

        const selectedUser = usersArray.filter(
          (user) => user.id === stream.user_id
        );

        stream.login = selectedUser[0].login;
        let newUrl = stream.thumbnail_url
          .replace('{width}', '320')
          .replace('{height}', '180');
        stream.thumbnail_url = newUrl;

        return stream;
      });

      setChannels(finalArray);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="topStreams_title">Stream les plus populaires</h1>
      <div className="topStreams_presentation">
        {channels.map((channel, index) => (
          <div key={index} className="topStreams_card">
            <img
              src={channel.thumbnail_url}
              alt="jeu"
              className="topStreams_card_img"
            />
            <div className="topStreams_card_body">
              <h5 className="topStreams_card_title">{channel.user_name}</h5>
              <p className="topStreams_card_text">Jeu: {channel.game_name}</p>
              <p className="topStreams_card_text viewers">
                Viewers: {channel.viewer_count}
              </p>
              <div className="topStreams_card_btn">
                Regarder {channel.user_name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopStreams;
