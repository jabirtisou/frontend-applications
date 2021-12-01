import React from 'react';
import { Link } from 'react-router-dom';
import logo from './Hamburger.svg';

const Header = () => {
  return (
    <nav>
      <div>
        <Link to='/'>
          <img src={logo} alt='hamburger' class='logo' />
        </Link>
      </div>
      <div>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='bar-chart'>Bar Chart</Link>
          </li>
          <li>
            <Link to='line-chart'>Line Chart</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
