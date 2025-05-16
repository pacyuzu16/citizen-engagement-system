const Complaint = require('../models/Complaint');

// Get all complaints (for admin)
exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching complaints' });
  }
};

// Update complaint status or add response
exports.updateComplaint = async (req, res) => {
  const { id } = req.params;
  const { status, response } = req.body;
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { status, response, updatedAt: Date.now() },
      { new: true }
    );
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ message: 'Error updating complaint' });
  }
};
// ... existing imports and code ...

exports.getAnalytics = async (req, res) => {
    try {
      const byCategory = await Complaint.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } }
      ]);
      const byStatus = await Complaint.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]);
      const byAgency = await Complaint.aggregate([
        { $group: { _id: '$agency', count: { $sum: 1 } } }
      ]);
      res.json({ byCategory, byStatus, byAgency });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching analytics' });
    }
  };