const express = require('express');
const router = express.Router();

const {
  addUser,
  getUsers,
  deleteUser,
  getUser,
  updateUser
} = require('../controllers/admin/users');

const { protect, authorize } = require('../middleware/auth');

router
  .get('/users', protect, authorize('admin'), getUsers)
  .post('/users', protect, authorize('admin'), addUser);

router
  .get('/users/:id', protect, authorize('admin'), getUser)
  .put('/users/:id', protect, authorize('admin'), updateUser)
  .delete('/users/:id', protect, authorize('admin'), deleteUser);

module.exports = router;