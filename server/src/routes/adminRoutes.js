const express = require('express');
const router = express.Router();
const { getComplaints, updateComplaint, getAnalytics } = require('../controllers/adminController');

router.get('/complaints', getComplaints);
router.patch('/complaints/:id', updateComplaint);
router.get('/analytics', getAnalytics); // New route

module.exports = router;