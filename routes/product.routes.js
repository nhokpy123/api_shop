const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/product.controller');

router.get('/getAllProduct', productCtrl.getAll);

router.post('/postProduct', productCtrl.create); // nếu cần middleware xác thực thì thêm sau
// Lấy theo ID
router.get('getProductById/:id', productCtrl.getById);

// Cập nhật theo ID
router.put('putProductById/:id', productCtrl.update);

// Xóa theo ID
router.delete('delete/:id', productCtrl.remove);


module.exports = router;
