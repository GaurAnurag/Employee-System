import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

import './Navbar.css';

function Navbar() {
  const { auth, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-heading">Employee System</div>
      <ul>
        {!auth ? (
          <>
            <li></li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li><button onClick={logout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
