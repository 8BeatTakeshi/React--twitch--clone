import React from 'react';
import { Link } from 'react-router-dom';
import logo from './TwitchIcon.svg';
import SearchIcon from './SearchIcon.svg';
import MenuIcon from './MenuIcon.svg';
import './Header.css';

const Header = () => {
  return (
    <div>
      <nav className="header_top">
        <ul className="menuList">
          <li className="navLink">
            <Link className="link" to="/">
              <img src={logo} alt="Logo Twitch" className="logo" />
            </Link>
          </li>

          <li className="navLink">
            <Link className="link" to="/">
              Top Games{' '}
            </Link>
          </li>

          <li className="navLink">
            <Link className="link" to="/top-streams">
              Top Streams
            </Link>
          </li>
          <li className="navLink">
            <form className="formSubmit">
              <input type="text" className="searchInput" />
              <button type="submit">
                <img
                  src={SearchIcon}
                  alt="Icone loupe"
                  className="searchIcon"
                />
              </button>
            </form>
          </li>
        </ul>
      </nav>

      <div className="menuResponsive-Btn">
        <img src={MenuIcon} alt="Icone menu responsive" className="menuIcon" />
      </div>
    </div>
  );
};

export default Header;
