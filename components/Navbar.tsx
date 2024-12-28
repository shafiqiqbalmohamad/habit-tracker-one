import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#333',
        padding: '10px 20px',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div>
        <h1 style={{ margin: 0, fontSize: '24px' }}>Habit Tracker</h1>
      </div>

      <div>
        <ul
          style={{
            display: 'flex',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          <li style={{ marginLeft: '20px' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>
              Home
            </Link>
          </li>
          <li style={{ marginLeft: '20px' }}>
            <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>
              Dashboard
            </Link>
          </li>
          <li style={{ marginLeft: '20px' }}>
            <Link to="/settings" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
