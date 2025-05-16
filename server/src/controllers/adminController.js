const Complaint = require('../models/Complaint');
const User = require('../models/User');

exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching complaints' });
  }
};

exports.updateComplaint = async (req, res) => {
  const { id } = req.params;
  const { status, response } = req.body;
  try {
    const complaint = await Complaint.findByIdAndUpdate(id, { status, response }, { new: true });
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ message: 'Error updating complaint' });
  }
};

exports.deleteComplaint = async (req, res) => {
  const { id } = req.params;
  try {
    await Complaint.findByIdAndDelete(id);
    res.json({ message: 'Complaint deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting complaint' });
  }
};

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
    const byUser = await Complaint.aggregate([
      { $group: { _id: '$userInfo.contact', count: { $sum: 1 } } }
    ]);
    res.json({ byCategory, byStatus, byAgency, byUser });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching analytics' });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, role } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, { email, role }, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error updating user' });
  }
};