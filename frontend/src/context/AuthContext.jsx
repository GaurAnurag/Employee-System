import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  // Check token on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          setAuth(null);
        } else {
          setAuth(decodedToken);
        }
      } catch (err) {
        console.error('Invalid token:', err);
        localStorage.removeItem('token');
        setAuth(null);
      }
    }
  }, []);

  // Login and store token
  const login = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      localStorage.setItem('token', token);
      setAuth(decodedToken);
    } catch (err) {
      console.error('Login failed: Invalid token');
    }
  };

  // Logout and clear token
  const logout = () => {
    localStorage.removeItem('token');
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

