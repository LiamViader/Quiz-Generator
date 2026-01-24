import React, { createContext, useState, useEffect, useContext } from 'react';
import { googleLogout } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import client from '../api/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await client.get('/users/me');
      const userData = res.data;
      const token = localStorage.getItem('token');
      const decoded = token ? jwtDecode(token) : {};
      setUser({ ...decoded, ...userData });
    } catch (error) {
      console.error("Failed to fetch user profile", error);
    }
  };

  const login = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const res = await client.post('/auth/google-login', { token });
      const { access_token } = res.data;

      localStorage.setItem('token', access_token);
      await fetchUserProfile();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = () => {
    googleLogout();
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;
        if (decoded.exp && decoded.exp < now) {
          localStorage.removeItem('token');
          setUser(null);
        } else {
          setUser(decoded);
          fetchUserProfile();
        }
      } catch (error) {
        console.error("Invalid token found", error);
        localStorage.removeItem('token');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, fetchUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
