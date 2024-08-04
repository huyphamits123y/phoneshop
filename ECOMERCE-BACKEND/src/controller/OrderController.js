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
const listsOrder = async (req, res) => {
    try {
        const id = req.params.id;
        console.log('id', id)

        if (!id) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Id khong ton tai'
            })
        }
        const response = await OrderService.listOrder(id)
        return res.status(200).json(response)

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
    // console.log(req.body);
    // return res.send("data success");

}



module.exports = {
    createOrder,
    listsOrder


}