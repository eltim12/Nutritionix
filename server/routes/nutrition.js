const router = require('express').Router()
const articleController = require('../controllers/nutritionController')



router.get('/', articleController.getArticle)

module.exports = router