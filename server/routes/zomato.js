const router = require('express').Router()
const Zomato = require('../controllers/zomatoController')

router.get('/search',Zomato.getNearby)

module.exports = router

