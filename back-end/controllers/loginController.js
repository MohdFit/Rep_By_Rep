// back-end/controllers/loginController.js
const User = require('../models/user'); 
const TokenService = require('../services/tokenService')
const { validationResult, body } = require('express-validator');
const { addToBlacklist } = require('../services/blacklist');

const loginUser = async (req, res) => {
  try {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    
    // if (!user.isActive) {
    //   return res.status(403).json({
    //     success: false,
    //     message: 'Account is deactivated. Please contact support.'
    //   });
    // }

    
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

   
    user.lastLogin = new Date();
    await user.save();

   
    const tokens = TokenService.generateTokenPair(user._id, user.role);
    const userResponse = user.toJSON();

      // Ensure role is always present in the user response 
    if (!userResponse.role && user.role) {
      userResponse.role = user.role;
    }
  
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: userResponse,
        tokens
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during login'
    });
  }
};


const validateLogin = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 1 })
    .withMessage('Password cannot be empty')
];

const blacklistedTokens = new Set();


const logoutUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (token) {
    addToBlacklist(token);
  }
  res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Logout failed' });
  }
};

module.exports = {
  loginUser,
  logoutUser,
};