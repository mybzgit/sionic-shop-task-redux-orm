import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { RootState } from '../../redux-store/redux-orm-store';
import classes from './Header.module.css';
import SearchBar from './SearchBar';

const Header: React.FC = () => {
  const location = useLocation();

  const cartInfo = useSelector((state: RootState) => state.shop.cart);
  const itemsCount = cartInfo.reduce((total, item) => {
    return total + item.count;
  }, 0);

  return (
    <div className={classes.header}>
      <Link className={classes.home_link} to="/">
        React
      </Link>

      <div className={classes.location}>
        <i className="bi bi-geo-alt"></i>
        Geolocation
      </div>

      {location.pathname === '/' && <SearchBar />}

      <div className={classes.cart}>
        <Link to="/cart">
          <i className="bi bi-cart2"></i>
        </Link>
        {itemsCount > 0 && <span>{itemsCount}</span>}
      </div>
      <div className={classes.profile}>
        <Link to="/history">
          <i className="bi bi-person"></i>
        </Link>
      </div>
    </div>
  );
};

export default Header;
