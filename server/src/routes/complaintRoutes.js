const express = require('express');
const router = express.Router();
const { submitComplaint, trackStatus } = require('../controllers/complaintController');

router.post('/', submitComplaint); // Submit a complaint
router.get('/:ticketId', trackStatus); // Track status by ticket ID

module.exports = router;