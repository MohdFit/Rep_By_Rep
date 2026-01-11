const jwt = require('jsonwebtoken');

class TokenService {
  // Generate JWT token
  static generateAccessToken(userId, role = 'user') {
    const payload = {
      userId,
      role,
      type: 'access',
      iat: Math.floor(Date.now() / 1000)
    };

    return jwt.sign(
      payload,
      process.env.JWT_SECRET || 'your-secret-key',
      { 
        expiresIn: process.env.JWT_ACCESS_EXPIRES || '15m',
        issuer: 'gym-coach-app'
      }
    );
  }

  // Generate refresh token (longer lasting)
  static generateRefreshToken(userId) {
    const payload = {
      userId,
      type: 'refresh',
      iat: Math.floor(Date.now() / 1000)
    };

    return jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key',
      { 
        expiresIn: process.env.JWT_REFRESH_EXPIRES || '7d',
        issuer: 'gym-coach-app'
      }
    );
  }

  // Verify access token
  static verifyAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid or expired access token');
    }
  }

  // Verify refresh token
  static verifyRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key');
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
  }

  // Generate token pair (access + refresh)
  static generateTokenPair(userId, role = 'user') {
    return {
      accessToken: this.generateAccessToken(userId, role),
      refreshToken: this.generateRefreshToken(userId),
      tokenType: 'Bearer',
      expiresIn: process.env.JWT_ACCESS_EXPIRES || '15m'
    };
  }

  // Decode token without verification (for getting payload)
  static decodeToken(token) {
    return jwt.decode(token);
  }
}

module.exports = TokenService;