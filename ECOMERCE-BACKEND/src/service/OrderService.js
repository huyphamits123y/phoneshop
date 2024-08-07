const User = require("../models/UserModel")
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");
const Order = require("../models/OrderModel");
// xu li lien quan den api
const createOrder = (newOrder) => {

    return new Promise(async (resolve, reject) => {

        const { orderItems, paymentMethod, deliveryMethod, totalPrice, fullName, address, phone, user } = newOrder;
        try {
            const createdOrder = await Order.create({
                orderItems,
                shippingAddress: {
                    fullName,
                    address,
                    phone
                },
                paymentMethod,
                deliveryMethod,
                totalPrice,
                user: user,
            })
            if (createdOrder) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdOrder
                })
            }






        } catch (e) {
            console.log('loi', e)
            reject(e)
            console.log('not success')
        }
    })
}
const listOrder = (user) => {

    return new Promise(async (resolve, reject) => {

        try {
            const listsOrder = await Order.find({ user: user });
            if (listsOrder === null) {
                resolve({
                    status: 'OK',
                    message: 'id khong ton tai'
                })
            }



            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: listsOrder,
            })






        } catch (e) {
            reject(e)
            console.log('not success')
        }
    })
}

module.exports = {
    createOrder,
    listOrder


}