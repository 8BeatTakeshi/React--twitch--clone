import React, { useState, useEffect } from 'react';
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
      <ul className="sidebar_streamList"></ul>
    </div>
  );
};

export default Sidebar;
