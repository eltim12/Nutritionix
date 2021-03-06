const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { authentication } = require('../middlewares/authentication')

router.post('/login', userController.login)
router.post('/google-login', userController.verify);
router.post('/register', userController.register);

module.exports = router