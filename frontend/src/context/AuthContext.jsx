import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(
      () => localStorage.getItem("token") || null
    );
    const [user, setUser] = useState(() => {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    });

    const isAuthenticated = Boolean(token);

    useEffect(() => {
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("token", token);
      } else {
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
      }
    }, [token]);

    // persist user info
    useEffect(() => {
      if (user) localStorage.setItem("user", JSON.stringify(user));
      else localStorage.removeItem("user");
    }, [user]);

    const login = ({ token: newToken, user: userObj }) => {
      setToken(newToken);
      setUser(userObj);
    };

    const logout = () => {
      setToken(null);
      setUser(null);
    };




  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);