import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuthData, setAuthData, clearAuthData } from '../utils/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { user: storedUser } = getAuthData();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (token, userData) => {
    setAuthData(token, userData);
    setUser(userData);
  };

  const logout = () => {
    clearAuthData();
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};