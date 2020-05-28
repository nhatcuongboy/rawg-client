import React from 'react';
import PropTypes from 'prop-types';
import { history } from '../utils/helpers';
import { FaSearch } from 'react-icons/fa';
import { GAMES_PATH } from '../constants/urlApi';
import CustomLink from './CustomLink';

const propTypes = {
  changeRoute: PropTypes.func.isRequired
};

const defaultProps = {};

const Header = ({ changeRoute, logOut, currentUser }) => {
  const handleLogOut = async () => {
    await logOut();
  };

  const handleKeyPress = e => {
    const code = e.which || e.keyCode;
    //press enter
    if (code === 13) {
      const value = e.target.value;
      if (value !== '') {
        changeRoute({ path: 'games', keys: {}, options: { query: value } });
        history.push(`/games?query=${value}`);
      }
    }
  };

  return (
    <header className="header">
      <h1 className="header__logo">
        <CustomLink path={GAMES_PATH} changeRoute={changeRoute}>
          RAWGC
        </CustomLink>
      </h1>
      <div className="search-bar">
        <button className="search-bar__button">
          <FaSearch className="search-bar__icon" />
        </button>
        <input
          type="text"
          className="search-bar__input"
          placeholder="Search for name"
          onKeyPress={handleKeyPress}
        />
      </div>
      {!currentUser ? (
        <React.Fragment>
          <CustomLink
            path={'/login'}
            changeRoute={changeRoute}
            className="btn u-uppercase"
            style={{ marginRight: '1rem' }}
          >
            Login
          </CustomLink>
          <CustomLink
            path={'/signup'}
            changeRoute={changeRoute}
            className="btn u-uppercase"
          >
            Sign up
          </CustomLink>
        </React.Fragment>
      ) : (
        <span onClick={handleLogOut} className="btn u-uppercase">
          Logout
        </span>
      )}
    </header>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default React.memo(Header);
