const User = require('../../models/user');  
// const TokenService = require('../services/tokenService')
// const { validationResult, body } = require('express-validator');


const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;


    if (!isValidObjectId(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }

   
    const restrictedFields = ['password', '_id', 'createdAt', 'updatedAt'];
    restrictedFields.forEach(field => delete updates[field]);

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid fields provided for update'
      });
    }

    if (updates.email) {
      const existingUser = await User.findByEmail(updates.email);
      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(409).json({
          success: false,
          message: 'Email already exists'
        });
      }
    }

    if (updates.fullName && (updates.fullName.trim().length < 2 || updates.fullName.trim().length > 50)) {
      return res.status(400).json({
        success: false,
        message: 'Full name must be between 2 and 50 characters'
      });
    }

    if (updates.phone) {
      const phoneRegex = /^(\+962|962|0)?7[789]\d{7}$/;
      if (!phoneRegex.test(updates.phone)) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid Jordanian phone number'
        });
      }
    }

  
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updates,
      { 
        new: true, // Return updated document
        runValidators: true // Run schema validators
      }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: {
        user: updatedUser
      }
    });

  } catch (error) {
    console.error('Update user error:', error);
    
    
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Email already exists'
      });
    }
      if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error updating user information'
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate MongoDB ObjectId format
    if (!isValidObjectId(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }

    // Check if user exists
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent admin from deleting themselves
    if (req.user && req.user.userId === userId) {
      return res.status(403).json({
        success: false,
        message: 'You cannot delete your own account'
      });
    }
     await User.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: {
        deletedUserId: userId
      }
    });

  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting user'
    });
  }
};


module.exports = {
  updateUser,
  deleteUser
};