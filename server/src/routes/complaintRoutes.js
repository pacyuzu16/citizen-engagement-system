const express = require('express');
const router = express.Router();
const { submitComplaint, trackStatus, getUserComplaints } = require('../controllers/complaintController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/', submitComplaint); // Public
router.get('/:ticketId', trackStatus); // Public
router.get('/user/complaints', verifyToken, getUserComplaints); // Protected

module.exports = router;