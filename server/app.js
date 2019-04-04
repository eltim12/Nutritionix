require("dotenv").config()

const express = require("express")
const cors = require("cors")
const app = express()
const port = 3000

const mongoose = require("mongoose")
mongoose.set("useFindAndModify", false)

//mongoose.connect('mongodb://localhost:27017/fancyTodo', { useNewUrlParser: true })

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.use(cors())

const zomatoRoutes = require('./routes/zomato')

// const googleMapsRoutes = require('./routes/googleMaps')
// const nutritionRoutes = require('./routes/nutrition')
// const userRoutes = require('./routes/user')

app.use('/', zomatoRoutes)
// app.use('/googleMaps', googleMapsRoutes)
// app.use('/nitritionRoutes', nutritionRoutes)
// app.use('/users', userRoutes)

app.listen(port, () => console.log("listening on port" + port))
