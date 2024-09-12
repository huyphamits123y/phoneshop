const express = require('express');
require('dotenv').config()
const { default: mongoose } = require('mongoose');
const routes = require('./routes');
const bodyParser = require('body-parser')
const app = express();
const qs = require('qs')
const Order = require('./models/OrderModel')
const port = process.env.PORT || 3001
const cors = require('cors')
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser')
const axios = require('axios').default; // npm install axios
const CryptoJS = require('crypto-js'); // npm install crypto-js
const moment = require('moment'); // npm install moment

const OrderService = require('./service/OrderService')
const UserService = require('./service/UserService')



const corsOptions = {
    origin: 'http://localhost:3000', // Địa chỉ frontend của bạn
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Các phương thức bạn muốn chấp nhận
    credentials: true, // Cho phép gửi cookie và thông tin xác thực cùng với yêu cầu
};
const config = {
    app_id: `${process.env.app_id}`,
    key1: `${process.env.key1}`,
    key2: `${process.env.key2}`,
    endpoint: `${process.env.endpoint}`
}

console.log('app_id', `${process.env.app_id}`)
console.log('key1', `${process.env.key1}`)
console.log('key2', `${process.env.key2}`)
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));



app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));



// app.use(cors())
app.use(cookieParser())
// app.use(bodyParser.json())
routes(app);

console.log(process.env.MONGO_DB)
mongoose.connect(`${process.env.MONGO_DB}`)
    .then(() => {
        console.log('Connect Db success!');
    })
    .catch((err) => {
        console.log('Error connecting to the database:', err);
    });
// mongoose.connect(`${process.env.MONGO_DB}`)
//     .then(() => {
//         console.log('Connect Db success!')
//     })
//     .catch((err) => {
//         console.log('first')
//     })



// console.log('Connecting to MongoDB with connection string:', process.env.MONGO_DB);
// mongoose.connect(process.env.MONGO_DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//     .then(() => {
//         console.log('Connect to MongoDB success!');
//     })
//     .catch((err) => {
//         console.error('Failed to connect to MongoDB', err);
//     });
app.post("/payment", async (req, res) => {
    const embed_data = {
        redirecturl: "http://localhost:3000/"
    };


    const items = [{}];

    const transID = Math.floor(Math.random() * 1000000);
    const order = {
        app_id: config.app_id,
        app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
        app_user: "user123",
        app_time: Date.now(), // miliseconds
        item: JSON.stringify(items),
        embed_data: JSON.stringify(embed_data),
        amount: 1899000,
        description: `Thanh toán MacBook Air 13 inch M1 #${transID}`,
        bank_code: "",
        callback_url: "https://3ef7-2001-ee0-5534-d7f0-91ab-fcf7-4522-8ba7.ngrok-free.app/callback"
    };

    // appid|app_trans_id|appuser|amount|apptime|embeddata|item
    const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    try {

        const result = await axios.post(config.endpoint, null, { params: order });
        console.log(result.data);
    } catch (error) {
        console.log(error.message);

    }

})


app.post("/callback", async (req, res) => {
    let result = {};

    try {
        let dataStr = req.body.data;
        let reqMac = req.body.mac;

        let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
        console.log("mac =", mac);



        // kiểm tra callback hợp lệ (đến từ ZaloPay server)
        if (reqMac !== mac) {
            // callback không hợp lệ
            result.return_code = -1;
            result.return_message = "mac not equal";
            console.log('khong hop le')
        }
        else {
            // thanh toán thành công
            // merchant cập nhật trạng thái cho đơn hàng


            let dataJson = JSON.parse(dataStr, config.key2);
            console.log("update order's status = success where app_trans_id = ", dataJson["app_trans_id"]);
            const res = await OrderService.getAllOrder()
            const user = await UserService.getAllUser()

            const data = res.data.filter(item => item.orderToken === dataJson["app_trans_id"]);


            if (data.length > 0) {
                const firstMatch = data[0];
                console.log('data', firstMatch)
                await OrderService.updateisPaid(firstMatch?.id)
                // console.log('user i d', firstMatch?.user?.toHexString())
                // console.log('userss', user?.data)

                const datauser = user.data.filter(users => users?._id.toHexString() === firstMatch?.user?.toHexString());
                if (datauser.length > 0) {
                    console.log('email')
                    const userfirstMatch = datauser[0];
                    console.log('email', userfirstMatch?.email)
                    const dataemail = await OrderService.sendEmailCreateOrder(userfirstMatch?.email, firstMatch?.id)
                    if (dataemail) {
                        console.log("gui mail thanh cong")
                    }

                }


            }




            result.return_code = 1;
            result.return_message = "success";
        }
    } catch (ex) {
        result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
        result.return_message = ex.message;
    }

    // thông báo kết quả cho ZaloPay server
    res.json(result);
});
app.post("/order-status/:app_trans_id", async (req, res) => {
    const app_trans_id = req.params.app_trans_id;
    let postData = {
        app_id: config.app_id,
        app_trans_id: app_trans_id, // Input your app_trans_id
    }

    let data = postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
    postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();


    let postConfig = {
        method: 'post',
        url: "https://sb-openapi.zalopay.vn/v2/query",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(postData)
    };

    try {
        const result = await axios(postConfig);
        return res.status(200).json(result.data);
    } catch (error) {
        console.log(error.message)
    }

})
app.listen(port, () => {
    console.log('Server is running in port', + port)
})