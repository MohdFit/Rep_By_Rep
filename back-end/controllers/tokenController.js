// back-end/controllers/tokenController.js
const TokenService = require('../services/tokenService');
const User = require('../models/user');

// Refresh token endpoint
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token is required'
      });
    }

    // Verify refresh token
    const decoded = TokenService.verifyRefreshToken(refreshToken);

    // Check if user exists and is active
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found or account deactivated'
      });
    }

    // Generate new token pair
    const tokens = TokenService.generateTokenPair(user._id, user.role);

    res.status(200).json({
      success: true,
      message: 'Tokens refreshed successfully',
      data: tokens
    });

  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid or expired refresh token'
    });
  }
};

// Verify token endpoint
const verifyToken = async (req, res) => {
  try {
    // Token already verified by authMiddleware
    res.status(200).json({
      success: true,
      message: 'Token is valid',
      data: {
        userId: req.user.userId,
        role: req.user.role,
        user: req.user.user.toJSON()
      }
    });

  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token verification failed'
    });
  }
};

// Revoke token (logout)
// const revokeToken = async (req, res) => {
//   try {

//     res.status(200).json({
//       success: true,
//       message: 'Token revoked successfully'
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error revoking token'
//     });
//   }
// };

module.exports = {
  refreshToken,
  verifyToken
};