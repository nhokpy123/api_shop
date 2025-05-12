const Review = require('../models/Review');

// Tạo review mới
exports.createReview = async (req, res) => {
  const { product, rating, comment } = req.body;
  const user = req.user.userId;

  try {
    const existingReview = await Review.findOne({ product, user });
    if (existingReview) {
      return res.status(400).json({ message: 'Bạn đã review sản phẩm này rồi.' });
    }

    const newReview = await Review.create({ product, user, rating, comment });
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy tất cả review của 1 sản phẩm
exports.getReviewsByProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const reviews = await Review.find({ product: productId }).populate('user', 'username');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cập nhật review
exports.updateReview = async (req, res) => {
  const { reviewId } = req.params;
  const user = req.user.userId;
  const { rating, comment } = req.body;

  try {
    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: 'Review không tồn tại' });

    if (review.user.toString() !== user)
      return res.status(403).json({ message: 'Bạn không có quyền sửa review này' });

    review.rating = rating ?? review.rating;
    review.comment = comment ?? review.comment;
    await review.save();

    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Xoá review
exports.deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  const user = req.user.userId;

  try {
    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: 'Review không tồn tại' });

    if (review.user.toString() !== user)
      return res.status(403).json({ message: 'Bạn không có quyền xoá review này' });

    await review.deleteOne();
    res.json({ message: 'Review đã được xoá' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
