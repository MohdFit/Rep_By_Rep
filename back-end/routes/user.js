const { authMiddleware , requireRole } = require('../middleware/authMiddleware');
const { getCurrentUser , getAllUsers, getUserById } = require('../controllers/user/userController');
const { updateUser , deleteUser } = require('../controllers/user/updateUser');

const express = require('express');
const router = express.Router();

router.get('/user',authMiddleware, getCurrentUser); // GET /api/user
router.get('/users',authMiddleware,requireRole(['admin']), getAllUsers);  // GET /api/users
router.get('/users/:userId',authMiddleware,requireRole(['admin']), getUserById);   // GET /api/users/:userId

router.put('/users/:userId',authMiddleware,requireRole(['admin']), updateUser);
router.delete('/users/:userId',authMiddleware,requireRole(['admin']), deleteUser);

module.exports = router;
