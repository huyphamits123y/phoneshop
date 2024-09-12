const express = require('express')
const router = express.Router();
const OrderController = require('../controller/OrderController')
const { authMiddleWare, authUserMiddleWare, authUserMiddleWare1 } = require('../middleware/authMiddleware');

router.post('/create', OrderController.createOrder)
router.get('/get-all-order', OrderController.getAllOrder);
router.get('/payment-order/:id', OrderController.listsOrder);
router.get('/payment-order-all', OrderController.listsOrderAll);
router.delete('/delete-order/:id', OrderController.deleteOrder);
router.post('/payment-order-success/:id', OrderController.paymentOrder);
router.post('/email/:email/:id', OrderController.sendEmailOrder);
router.post('/callback', OrderController.callbackOrder);
module.exports = router