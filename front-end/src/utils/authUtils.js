
import api from "../api/axios";

export const authUtils = {

  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },

 
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch (e) {
      console.error("Failed to parse user from localStorage:", e);
      return null;
    }
  },

 
  getToken: () => {
    return localStorage.getItem('token');
  },

 
  getRefreshToken: () => {
    return localStorage.getItem('refreshToken');
  },

  storeAuthData: (tokens, user) => {
    if (tokens) {
      if (tokens.accessToken) {
        localStorage.setItem('token', tokens.accessToken);
      }
      if (tokens.refreshToken) {
        localStorage.setItem('refreshToken', tokens.refreshToken);
      }
    }

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  },

  
  clearAuthData: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },

  
  logout: async () => {
    try {
      // Call logout endpoint to invalidate token on server
      await api.post('/logout');
    } catch (e) {
      console.error("Logout API call failed:", e);
    } finally {
      // Clear local data regardless of API response
      authUtils.clearAuthData();
    }
  },

  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  
  isValidPassword: (password) => {
    return password && password.length >= 6;
  },

 
  getRegistrationErrors: (fullName, email, password, confirmPassword) => {
    const errors = {};

    if (!fullName || fullName.trim().length === 0) {
      errors.fullName = "Full name is required";
    }

    if (!email || email.trim().length === 0) {
      errors.email = "Email is required";
    } else if (!authUtils.isValidEmail(email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (!authUtils.isValidPassword(password)) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  },

 
  getLoginErrors: (email, password) => {
    const errors = {};

    if (!email || email.trim().length === 0) {
      errors.email = "Email is required";
    } else if (!authUtils.isValidEmail(email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    return errors;
  }
};

export default authUtils;
