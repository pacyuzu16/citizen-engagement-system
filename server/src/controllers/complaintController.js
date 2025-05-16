const Complaint = require('../models/Complaint');
const { v4: uuidv4 } = require('uuid');

// Simple categorization based on keywords
const categorizeComplaint = (description) => {
    const keywords = {
      Infrastructure: { words: ['road', 'pothole', 'street', 'bridge', 'sidewalk'], priority: 3 },
      Health: { words: ['hospital', 'clinic', 'medicine', 'doctor', 'healthcare'], priority: 2 },
      Sanitation: { words: ['garbage', 'waste', 'clean', 'sewage', 'trash'], priority: 2 },
      Education: { words: ['school', 'teacher', 'education', 'classroom'], priority: 1 },
      General: { words: [], priority: 0 } // Default
    };
  
    let bestMatch = { category: 'General', agency: 'General Services', priority: -1 };
    const desc = description.toLowerCase();
  
    for (const [category, { words, priority }] of Object.entries(keywords)) {
      if (words.some(word => desc.includes(word)) && priority > bestMatch.priority) {
        bestMatch = { category, agency: `${category} Department`, priority };
      }
    }
  
    return bestMatch;
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

// ... existing imports and code ...

exports.getUserComplaints = async (req, res) => {
    const { contact } = req.query; // Get contact from query params
    try {
      const complaints = await Complaint.find({ 'userInfo.contact': contact })
        .sort({ createdAt: -1 }) // Sort by newest first
        .limit(10); // Limit to 10 recent complaints
      res.json(complaints);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching complaints' });
    }
  };