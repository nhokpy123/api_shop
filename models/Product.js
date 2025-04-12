const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: Number, unique: true }, // dùng nếu bạn muốn đồng bộ với dữ liệu từ API ngoài
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  category: String,
  image: String,
  rating: {
    rate: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  }
});

module.exports = mongoose.model('Product', productSchema);
