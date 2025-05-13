const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Thiếu productId'],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Thiếu userId'],
    },
    content: {
      type: String,
      required: [true, 'Nội dung không được để trống'],
      trim: true,
      minlength: [1, 'Nội dung phải có ít nhất 1 ký tự'],
    },
  },
  {
    timestamps: true, // ✅ tự động tạo createdAt và updatedAt
  }
);

module.exports = mongoose.model('Comment', commentSchema);
