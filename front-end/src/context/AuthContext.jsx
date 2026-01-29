import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authUtils from '../utils/authUtils';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = () => {
      const storedUser = authUtils.getCurrentUser();
      const token = authUtils.getToken();

      if (storedUser && token) {
        setUser(storedUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }

      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = useCallback((tokens, user) => {
    authUtils.storeAuthData(tokens, user);
    setUser(user);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(async () => {
    await authUtils.logout();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const updateUser = useCallback((updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  }, []);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;
