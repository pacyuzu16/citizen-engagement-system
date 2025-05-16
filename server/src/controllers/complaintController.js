const Complaint = require('../models/Complaint');
const { v4: uuidv4 } = require('uuid');

// Simple categorization based on keywords
const categorizeComplaint = (description) => {
  const keywords = {
    Infrastructure: ['road', 'pothole', 'street'],
    Health: ['hospital', 'clinic', 'medicine'],
    Sanitation: ['garbage', 'waste', 'clean']
  };
  for (const [category, words] of Object.entries(keywords)) {
    if (words.some(word => description.toLowerCase().includes(word))) {
      return { category, agency: `${category} Department` };
    }
  }
  return { category: 'General', agency: 'General Services' };
};

// Submit a complaint
exports.submitComplaint = async (req, res) => {
  const { title, description, name, contact } = req.body;
  const { category, agency } = categorizeComplaint(description);
  const ticketId = uuidv4();
  try {
    const complaint = new Complaint({
      ticketId,
      title,
      description,
      category,
      agency,
      userInfo: { name, contact }
    });
    await complaint.save();
    res.status(201).json({ ticketId, message: 'Complaint submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting complaint' });
  }
};

// Track complaint status
exports.trackStatus = async (req, res) => {
  const { ticketId } = req.params;
  try {
    const complaint = await Complaint.findOne({ ticketId });
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.json({
      ticketId,
      status: complaint.status,
      response: complaint.response
    });
  } catch (err) {
    res.status(500).json({ message: 'Error tracking complaint' });
  }
};