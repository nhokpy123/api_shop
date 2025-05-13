const mongoose = require('mongoose');
const Comment = require('../models/Comment');

// ✅ Thêm comment mới
exports.createComment = async (req, res) => {
  try {
    const { productId, userId, content } = req.body;

    // Kiểm tra đầu vào
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'Invalid productId' });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid userId' });
    }

    if (!content || content.trim() === "") {
      return res.status(400).json({ error: 'Nội dung comment không được để trống.' });
    }

    const comment = new Comment({ productId, userId, content });
    await comment.save();

    res.status(201).json({ message: 'Comment added successfully', comment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment', details: error.message });
  }
};

// ✅ Lấy tất cả comment theo _id của product
exports.getCommentsByProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'Invalid productId' });
    }

    const comments = await Comment.find({ productId })
      .populate('userId', 'username email') // hiện thông tin user nếu có
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get comments', details: error.message });
  }
};

// ✅ Cập nhật nội dung comment theo ID
exports.updateComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const { content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ error: 'Invalid commentId' });
    }

    if (!content || content.trim() === "") {
      return res.status(400).json({ error: 'Nội dung comment không được để trống.' });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ error: 'Không tìm thấy comment để cập nhật.' });
    }

    res.json({ message: 'Cập nhật comment thành công', comment: updatedComment });
  } catch (error) {
    res.status(500).json({ error: 'Cập nhật comment thất bại', details: error.message });
  }
};
