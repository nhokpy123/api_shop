const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/', commentController.createComment);
router.get('/:productId', commentController.getCommentsByProduct);
router.put('/:id', commentController.updateComment);

module.exports = router;
