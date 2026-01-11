// back-end/middleware/authMiddleware.js
const TokenService = require('../services/tokenService');
const User = require('../models/user');
const { isBlacklisted } = require('../services/blacklist');

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }
    
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    if (isBlacklisted(token)) {
      
      return res.status(401).json({
        success: false,
        message: 'Session expired. Please log in again.',
        code: 'TOKEN_REVOKED'
      });
    }
   
    // Verify token
    const decoded = TokenService.verifyAccessToken(token);

    // Check if user still exists 
    const user = await User.findById(decoded.userId);
    
    // if (!user || !user.isActive) {
    //   return res.status(401).json({
    //     success: false,
    //     message: 'User not found or account deactivated'
    //   });
    // }
       

    // Add user info to request
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
      user: user
    };

    next();
  } catch (error) {
    if (error.message.includes('expired')) {
      return res.status(401).json({
        success: false,
        message: 'Token expired',
        code: 'TOKEN_EXPIRED'
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

// Role-based middleware
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const userRoles = Array.isArray(roles) ? roles : [roles];
    
    if (!userRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions'
      });
    }

    next();
  };
};

module.exports = { authMiddleware, requireRole };