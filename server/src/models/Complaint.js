const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  ticketId: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  agency: { type: String, required: true },
  status: { type: String, default: 'Submitted', enum: ['Submitted', 'In Progress', 'Resolved'] },
  userInfo: { name: String, contact: String },
  createdAt: { type: Date, default: Date.now },
  response: { type: String, default: '' } // Ensure default empty string
});

module.exports = mongoose.model('Complaint', complaintSchema);