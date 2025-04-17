const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { requireAdmin } = require('../middlewares/roleMiddleware');
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');


router.get('/', authMiddleware, getAllUsers);
router.get('/:id', authMiddleware, getUserById);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, requireAdmin, deleteUser);

module.exports = router;
