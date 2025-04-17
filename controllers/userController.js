const User = require('../models/User');


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


const updateUser = async (req, res) => {
    try {
      const { username, email, role } = req.body;
  
      // Chỉ admin mới được cập nhật role
      const updateData = { username, email };
      if (req.user.role === 'admin' && role) {
        updateData.role = role;
      }
  
      const user = await User.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      ).select('-password');
  
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'User updated', user });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
