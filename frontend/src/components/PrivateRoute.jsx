import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  if (!auth) {
    // Not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, show the protected page
  return children;
};

export default PrivateRoute;
