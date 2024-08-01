const express = require('express')
const router = express.Router();
const ProductController = require("../controller/ProductController");
const { authMiddleWare, authUserMiddleWare, authUserMiddleWare1 } = require('../middleware/authMiddleware');

router.post('/create', ProductController.createProduct);
router.put('/update/:id', authMiddleWare, ProductController.updateProduct);
router.get('/get-details/:id', ProductController.detailsProduct);
router.delete('/delete/:id', ProductController.deleteProduct);
router.get('/get-all', ProductController.getAllProduct);
router.get('/get-allsearch', ProductController.getAllProductSearch);
router.get('/get-all-type', ProductController.getAllType)
module.exports = router