import React, { useState, useEffect } from 'react';
/* The useLocation hook returns the location object which contains the pathname,
search, hash, key and the state properties of the current location.*/
import { useLocation, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import api from '../../api';
import './GameStreams.css';

const GameStreams = () => {
  const [streamData, setStreamData] = useState([]);
  const [viewers, setViewers] = useState([]);

  let { slug } = useParams();
  let location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(
        `https://api.twitch.tv/helix/streams?game_id=${location.state.gameId}`
      );
      let dataArray = result.data.data;
      let finalArray = dataArray.map((stream) => {
        let newURL = stream.thumbnail_url
          .replace('{width}', '320')
          .replace('{height}', '180');
        stream.thumbnail_url = newURL;
        return stream;
      });

      let totalViewers = finalArray.reduce((acc, val) => {
        return acc + val.viewer_count;
      }, 0);

      let userIDs = dataArray.map((stream) => {
        return stream.user_id;
      });

      // Users Login Array
      /* we need the login of streamers to reach their channels,
      we could use their name but the player could not work using some
      characters used in (nick)names (chinese, korean...) so that's why
      we have retrieve the login of the stream to avoid malfunctions */
      let queryParamsUsers = '';
      userIDs.map((id) => {
        return (queryParamsUsers = queryParamsUsers + `id=${id}&`);
      });

      let getUsersLogin = await api.get(
        `https://api.twitch.tv/helix/users?${queryParamsUsers}`
      );

      let userLoginArray = getUsersLogin.data.data;

      // Add logins in finalArray
      finalArray = dataArray.map((stream) => {
        const selectedUser = userLoginArray.filter(
          (user) => user.id === stream.user_id
        );
        stream.login = selectedUser[0].login;
        return stream;
      });

      setViewers(totalViewers);
      setStreamData(finalArray);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="gameStreams_title">Streams : {slug}</h1>
      <h3 className="gameStreams_subtitle">
        <strong className="textColored">{viewers}</strong> personnes regardent{' '}
        {slug}
      </h3>
      <div className="gameStreams_presentation">
        {streamData.map((stream, index) => (
          <div key={index} className="gameStreams_card">
            <img
              src={stream.thumbnail_url}
              alt="jeu carte"
              className="gameStreams_card_img"
            />

            <div className="gameStreams_card_body">
              <h5 className="gameStreams_card_title">{stream.user_name}</h5>
              <p className="gameStreams_card_text">
                Nombre de viewers : {stream.viewer_count}
              </p>

              <Link
                className="link"
                to={{
                  pathname: `/live/${stream.login}`,
                }}
              >
                <div className="gameStreams_card_btn">
                  Regarder {stream.user_name}
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameStreams;
