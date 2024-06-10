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

app.use(cors())
app.use(cookieParser())
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