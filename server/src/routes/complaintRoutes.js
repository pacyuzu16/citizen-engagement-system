const express = require('express');
const router = express.Router();
const { submitComplaint, trackStatus, getUserComplaints } = require('../controllers/complaintController');

router.post('/', submitComplaint);
router.get('/:ticketId', trackStatus);
router.get('/user/complaints', getUserComplaints); // New route

module.exports = router;