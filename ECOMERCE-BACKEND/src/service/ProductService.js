const Product = require("../models/ProductModel")
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");
// xu li lien quan den api
const createProduct = (newProduct) => {

    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock, rating, description } = newProduct;
        try {
            const checkProduct = await Product.findOne({
                name: name
            })
            if (checkProduct !== null) {
                resolve({
                    status: 'OK',
                    message: 'Product da ton tai'
                })
            }

            const createdProduct = await Product.create({
                name,
                image,
                type,
                countInStock,
                price,
                rating,
                description,
            })
            if (createdProduct) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdProduct
                })
            }






        } catch (e) {
            reject(e)
            console.log('not success')
        }
    })
}

const updateProduct = (id, data) => {

    return new Promise(async (resolve, reject) => {

        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'id khong ton tai'
                })
            }


            const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });
            if (updatedProduct) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: updatedProduct
                })
            }






        } catch (e) {
            reject(e)
            console.log('not success')
        }
    })
}
const detailsProduct = (id) => {

    return new Promise(async (resolve, reject) => {

        try {
            const detailsProduct = await Product.findOne({
                _id: id
            })
            if (detailsProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'id khong ton tai'
                })
            }



            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: detailsProduct,
            })






        } catch (e) {
            reject(e)
            console.log('not success')
        }
    })
}
const deleteProduct = (id) => {

    return new Promise(async (resolve, reject) => {

        try {
            const deleteProduct = await Product.findOne({
                _id: id
            })
            if (deleteProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'id khong ton tai'
                })
            }
            await Product.findByIdAndDelete(id);




            resolve({
                status: 'OK',
                message: 'DELETE SUCCESS',

            })






        } catch (e) {
            reject(e)
            console.log('not success')
        }
    })
}
// const getAllProduct = (limit, page, sort, filter) => {

//     return new Promise(async (resolve, reject) => {

//         // sort sap xep
//         // filter lọc dữ liệu có những ký tự giống với query truyền vào tùy vào người dùng muốn lọc dựa trên nội dung nào
//         try {
//             console.log('sort', sort);
//             const totalProduct = await Product.countDocuments();
//             console.log('filter', filter);
//             if (filter) {
//                 const label = filter[0];
//                 console.log('label', label)
//                 const allObjectFilter = await Product.find({
//                     [label]: { '$regex': filter[1] }
//                 }).limit(limit).skip(page * limit)
//                 resolve({
//                     status: 'OK',
//                     message: 'SUCCESS',
//                     data: allObjectFilter,
//                     total: totalProduct,
//                     pageCurrent: Number(page + 1),
//                     totalPage: Math.ceil(totalProduct / limit),

//                 })
//             }

//             if (sort) {
//                 console.log('okok')
//                 const objectSort = {}
//                 objectSort[sort[1]] = sort[0]
//                 const getAllsProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort)
//                 resolve({
//                     status: 'OK',
//                     message: 'GET ALL PRODUCT',
//                     data: getAllsProductSort,
//                     total: totalProduct,
//                     pageCurrent: Number(page + 1),
//                     totalPage: Math.ceil(totalProduct / limit),

//                 })
//                 console.log('objectSort', objectSort)

//             }
//             const getAllsProduct = await Product.find().limit(limit).skip(page * limit).sort({
//                 name: sort
//             })

//             // limit số lượng sản phẩm giới hạn
//             // skip bỏ qua bao nhiêu sản phẩm







//         } catch (e) {
//             reject(e)
//             console.log('not success')
//         }
//     })
// }
const getAllProduct = () => {

    return new Promise(async (resolve, reject) => {

        // sort sap xep
        // filter lọc dữ liệu có những ký tự giống với query truyền vào tùy vào người dùng muốn lọc dựa trên nội dung nào
        try {

            const totalProduct = await Product.countDocuments();
            const getAllsProduct = await Product.find();


            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: getAllsProduct,
                total: totalProduct,


            })




            // limit số lượng sản phẩm giới hạn
            // skip bỏ qua bao nhiêu sản phẩm







        } catch (e) {
            reject(e)
            console.log('not success')
        }
    })
}
module.exports = {
    createProduct,
    updateProduct,
    detailsProduct,
    deleteProduct,
    getAllProduct


}