const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/product.controller');

router.get('/getAllProduct', productCtrl.getAll);
router.post('/postProduct', productCtrl.create); // nếu cần middleware xác thực thì thêm sau

module.exports = router;
