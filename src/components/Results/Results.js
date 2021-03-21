import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../api';
import './Results.css';

const Results = () => {
  const [result, setResult] = useState(true);
  const [streamerInfo, setStreamerInfo] = useState([]);

  let { slug } = useParams();
  let cleanSearch = slug.replace(/ /g, '');

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(
        `https://api.twitch.tv/helix/users?login=${cleanSearch}`
      );
      console.log(result);
      setStreamerInfo(result.data.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="results_container">
        <h4>Résultats de recherche</h4>
        {streamerInfo.map((stream, index) => (
          <div key={index} className="results_card">
            <img
              src={stream.profile_image_url}
              alt="résultat profil"
              className="results_card_img"
            />
            <div className="results_card_body">
              <h5 className="results_card_title">{stream.display_name}</h5>
              <div className="results_card_text">{stream.description}</div>

              <Link
                className="link"
                to={{
                  pathname: `/live/${stream.login}`,
                }}
              >
                <div className="results_card_btn">
                  Regarder {stream.display_name}
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
