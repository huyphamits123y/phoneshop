const express = require('express')
const router = express.Router();
const userController = require("../controller/UserController");
const { authMiddleWare, authUserMiddleWare, authUserMiddleWare1 } = require('../middleware/authMiddleware');

router.post('/sign-up', userController.createUser);
router.post('/sign-in', userController.loginUser);
router.put('/update-user/:id', userController.updateUser);
router.delete('/delete-user/:id', authMiddleWare, userController.deleteUser);
router.get('/getAll', authMiddleWare, userController.getAllUser);
router.get('/get-details/:id', authUserMiddleWare, userController.getDetailsUser);
router.post('/refresh-token', authUserMiddleWare1, userController.refreshtoken);
module.exports = router