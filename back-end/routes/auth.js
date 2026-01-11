// back-end/routes/auth.js
const { loginUser, logoutUser  } = require('../controllers/loginController');
const { refreshToken } = require('../controllers/tokenController');
const express = require('express');
const { registerUser } = require('../controllers/registerController');
const router = express.Router();

router.post('/login', loginUser);

router.post('/logout', logoutUser);

router.post('/register', registerUser);


// tokens
router.post('/refresh-token', refreshToken);

module.exports = router;