const express = require('express')
const router = express.Router();
const OrderController = require('../controller/OrderController')
const { authMiddleWare, authUserMiddleWare, authUserMiddleWare1 } = require('../middleware/authMiddleware');

router.post('/create', OrderController.createOrder)
router.get('/payment-order/:id', OrderController.listsOrder);
module.exports = router