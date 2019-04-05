const router = require('express').Router()
const googleMap = require('../controllers/googleMapController')

router.get('/',googleMap.distanceTime)

module.exports = router