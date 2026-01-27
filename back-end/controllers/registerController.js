// back-end/controllers/registerController.js
const User = require('../models/user'); 
const TokenService = require('../services/tokenService');

// Register Controller
const registerUser = async (req, res) => {
  try {
    

    const { fullName, email, password, phone, role } = req.body;

    
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists with this email'
      });
    }


    // Create new user
    const newUser = new User({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: role || 'user' 
    });

   
    await newUser.save();


    const tokens = TokenService.generateTokenPair(newUser._id, newUser.role);
    const userResponse = newUser.toJSON();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: userResponse,
        tokens
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during registration'
    });
  }
}

module.exports = {
  registerUser
};
