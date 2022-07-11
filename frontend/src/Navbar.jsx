import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Auth</Link>
        </li>
        <li>
          <Link to="/home">Home</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
