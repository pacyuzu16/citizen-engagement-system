const express = require('express');
const router = express.Router();
const { getComplaints, updateComplaint } = require('../controllers/adminController');

router.get('/complaints', getComplaints); // View all complaints
router.patch('/complaints/:id', updateComplaint); // Update a complaint

module.exports = router;