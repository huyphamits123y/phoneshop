const express = require('express');
require('dotenv').config()
const { default: mongoose } = require('mongoose');
const routes = require('./routes');
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 3001
const cors = require('cors')
const cookieParser = require('cookie-parser')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



const corsOptions = {
    origin: 'http://localhost:3000', // Địa chỉ frontend của bạn
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Các phương thức bạn muốn chấp nhận
    credentials: true, // Cho phép gửi cookie và thông tin xác thực cùng với yêu cầu
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));



// app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
routes(app);

console.log(process.env.MONGO_DB)
// mongoose.connect(`${process.env.MONGO_DB}`)
//     .then(() => {
//         console.log('Connect Db success!')
//     })
//     .catch((err) => {
//         console.log('first')
//     })

mongoose.connect(`${process.env.MONGO_DB}`)
    .then(() => {
        console.log('Connect Db success!');
    })
    .catch((err) => {
        console.log('Error connecting to the database:', err);
    });

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
app.listen(port, () => {
    console.log('Server is running in port', + port)
})