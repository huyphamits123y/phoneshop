const { response } = require('express');
const ProductService = require('../service/ProductService')
const JwtService = require('../service/JwtService')
const createProduct = async (req, res) => {
    try {
        const { name, image, type, price, countInStock, rating, description } = req.body;
        console.log('check', req.body)
        if (!name || !image || !type || !price || !countInStock || !rating || !description) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }

        const response = await ProductService.createProduct(req.body);
        return res.status(200).json(response)

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
    // console.log(req.body);
    // return res.send("data success");

}
// const createProduct = async (req, res) => {
//     try {
//         const { name, image, type, price, countInStock, rating, description } = req.body;
//         console.log('check', req.body)
//         if (!name || !image || !type || !price || !countInStock || !rating || !description) {
//             return res.status(400).json({
//                 status: 'ERR',
//                 message: 'The input is required'
//             })
//         }
//         console.log('vvvv')
//         return res.status(200).json({
//             status: 'success',
//             message: 'success'
//         })

//         // const response = await ProductService.createProduct(req.body);
//         // return res.status(200).json(response)

//     } catch (e) {
//         return res.status(404).json({
//             message: e
//         })
//     }
//     // console.log(req.body);
//     // return res.send("data success");

// }
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Id khong ton tai'
            })
        }
        const response = await ProductService.updateProduct(productId, req.body);
        return res.status(200).json(response)

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
    // console.log(req.body);
    // return res.send("data success");

}
const detailsProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        console.log(productId)

        if (!productId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Id khong ton tai'
            })
        }
        const response = await ProductService.detailsProduct(productId);
        return res.status(200).json(response)

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
    // console.log(req.body);
    // return res.send("data success");

}
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;


        if (!productId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Id khong ton tai'
            })
        }
        const response = await ProductService.deleteProduct(productId);
        return res.status(200).json(response)

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }


}
const getAllProduct = async (req, res) => {
    try {

        const { limit, page, sort, filter } = req.query;
        const response = await ProductService.getAllProduct(Number(limit) || 3, Number(page) || 0, sort, filter);
        return res.status(200).json(response)

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }


}
module.exports = {
    createProduct,
    updateProduct,
    detailsProduct,
    deleteProduct,
    getAllProduct

}