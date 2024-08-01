const { response } = require('express');
const OrderService = require('../service/OrderService')
const JwtService = require('../service/JwtService')
const createOrder = async (req, res) => {
    try {
        const { orderItems, paymentMethod, deliveryMethod, totalPrice, fullName, address, phone, user } = req.body;
        console.log('delivery', deliveryMethod)
        if (!orderItems || !paymentMethod || !deliveryMethod || !totalPrice || !fullName || !address || !phone || !user) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }

        const response = await OrderService.createOrder(req.body);
        return res.status(200).json(response)

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }


}



module.exports = {
    createOrder


}