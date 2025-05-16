const express = require('express');
const router = express.Router();
const { getComplaints, updateComplaint, deleteComplaint, getAnalytics, getUsers, deleteUser, updateUser } = require('../controllers/adminController');
const { verifyToken, restrictToAdmin } = require('../middleware/authMiddleware');

router.get('/complaints', verifyToken, restrictToAdmin, getComplaints);
router.patch('/complaints/:id', verifyToken, restrictToAdmin, updateComplaint);
router.delete('/complaints/:id', verifyToken, restrictToAdmin, deleteComplaint);
router.get('/analytics', verifyToken, restrictToAdmin, getAnalytics);
router.get('/users', verifyToken, restrictToAdmin, getUsers);
router.delete('/users/:id', verifyToken, restrictToAdmin, deleteUser);
router.patch('/users/:id', verifyToken, restrictToAdmin, updateUser);

module.exports = router;