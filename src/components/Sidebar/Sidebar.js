import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import './Sidebar.css';

const Sidebar = () => {
  const [topStreams, setTopStreams] = useState([]);

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
        stream.truePic = '';
        stream.login = '';

        const selectedUser = usersArray.filter(
          (user) => user.id === stream.user_id
        );

        stream.truePic = selectedUser[0].profile_image_url;
        stream.login = selectedUser[0].login;

        return stream;
      });

      setTopStreams(finalArray.slice(0, 6));
    };

    fetchData();
  }, []);

  return (
    <div className="sidebar">
      <h2 className="sidebar_title">Chaines recommandées</h2>
      <ul className="sidebar_streamList">
        {topStreams.map((stream, index) => (
          <Link
            key={index}
            className="link"
            to={{
              pathname: `/live/${stream.login}`,
            }}
          >
            <li key={index} className="streamList_flexContainer">
              <img
                src={stream.truePic}
                alt="user logo"
                className="streamList_profilePic"
              />
              <div className="streamList_streamUser">{stream.user_name}</div>
              <div className="streamList_viewerRight">
                <div className="streamList_redPoint"></div>
                <div>{stream.viewer_count}</div>
              </div>
              <div className="streamList_gameName">{stream.game_name}</div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
