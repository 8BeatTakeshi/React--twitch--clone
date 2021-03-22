import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from './TwitchIcon.svg';
import searchIcon from './SearchIcon.svg';
import menuIcon from './MenuIcon.svg';
import cancelIcon from './CancelIcon.svg';
import './Header.css';

const Header = () => {
  const [menu, setMenu] = useState(false); // Responsive Menu
  const [smallScreen, setSmallScreen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 900px');
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  });

  const handleMediaQueryChange = (mediaQuery) => {
    mediaQuery.matches ? setSmallScreen(true) : setSmallScreen(false);
  };

  const toggleNavRes = () => {
    setMenu(!menu);
  };

  const hideMenu = () => {
    if (menu) {
      setMenu(!menu);
    }
  };

  const handleSubmit = (e, mediaQuery) => {
    e.preventDefault();
  };

  const handleKeyPress = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div>
      <nav className="header_top">
        {(menu || !smallScreen) && (
          <ul className="menuList">
            <li onClick={hideMenu} className="navLink">
              <Link className="link" to="/">
                <img src={logo} alt="Logo Twitch" className="logo" />
              </Link>
            </li>

            <li onClick={hideMenu} className="navLink">
              <Link className="link" to="/">
                Top Games{' '}
              </Link>
            </li>

            <li onClick={hideMenu} className="navLink">
              <Link className="link" to="/top-streams">
                Top Streams
              </Link>
            </li>
            <li className="navLink">
              <form className="formSubmit" onSubmit={handleSubmit}>
                <input
                  required
                  value={searchInput}
                  type="text"
                  className="searchInput"
                  onChange={(e) => handleKeyPress(e)}
                />
                <Link
                  className="link"
                  to={{
                    pathname: `/resultats/${searchInput}`,
                  }}
                >
                  <button
                    type="submit"
                    onClick={() => smallScreen && setMenu(!menu)}
                  >
                    <img
                      src={searchIcon}
                      alt="Icone loupe"
                      className="searchIcon"
                    />
                  </button>
                </Link>
              </form>
            </li>
          </ul>
        )}
      </nav>

      <div className="menuResponsive-Btn">
        <img
          onClick={toggleNavRes}
          src={menu ? cancelIcon : menuIcon}
          alt="Icone menu responsive"
          className="menuIcon"
        />
      </div>
    </div>
  );
};

export default Header;
