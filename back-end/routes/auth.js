const { loginUser, logoutUser  } = require('../controllers/loginController');
const { refreshToken } = require('../controllers/tokenController');
const { changePassword } = require('../controllers/user/changePassword');
const { authMiddleware } = require('../middleware/authMiddleware');
const express = require('express');
const { registerUser } = require('../controllers/registerController');
const router = express.Router();

router.post('/login', loginUser);

router.post('/logout', logoutUser);

router.post('/register', registerUser);

router.post('/refresh-token', refreshToken);

router.post('/change-password', authMiddleware, changePassword);

module.exports = router;