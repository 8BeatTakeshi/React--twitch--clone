import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import './Games.css';

const Games = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get('https://api.twitch.tv/helix/games/top');
      let dataArray = result.data.data;
      let finalArray = dataArray.map((game) => {
        let newUrl = game.box_art_url
          .replace('{width}', 250)
          .replace('{height}', 300);
        game.box_art_url = newUrl;
        return game;
      });

      setGames(finalArray);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="games_title">Jeux les plus populaires</h1>
      <div className="games_presentation">
        {games.map((game, index) => (
          <div key={index} className="games_card">
            <img
              src={game.box_art_url}
              alt="jeu profile pic"
              className="card_img"
            />
            <div className="games_card_body">
              <h5 className="games_card_title">{game.name}</h5>
              <Link
                className="link"
                to={{
                  pathname: 'game/' + game.name.replace(/ +/g, ''), // regex to remove spaces
                  state: {
                    gameId: game.id,
                  },
                }}
              >
                <div className="games_card_btn">Regarder {game.name}</div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
