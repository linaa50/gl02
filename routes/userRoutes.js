const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
  updatePassword,
  updateUserRole
} = require('../controllers/userController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

// Routes publiques
router.post('/register', registerUser);
router.post('/login', loginUser);

// Routes protégées par JWT
router.get('/profile', protect, getUserProfile);
router.put('/update-password', protect, updatePassword); // Exercice 1

// Routes admin (JWT valide + rôle admin)
router.get('/', protect, adminOnly, getAllUsers);
router.put('/:id/role', protect, adminOnly, updateUserRole); // Exercice 2

module.exports = router;