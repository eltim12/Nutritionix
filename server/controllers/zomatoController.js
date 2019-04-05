const axios = require('axios')

var zomato = axios.create({
    baseURL: 'https://developers.zomato.com/api/v2.1',
    timeout: 2000
});

zomato.defaults.headers.common['user-key'] = process.env.ZOMATO_KEY;

class Zomato {
    static getNearby(req, res) {

        let lat = req.query.lat
        let lon = req.query.lon
        let radius = req.query.radius
        let sortBy = req.query.sortBy
        let order = req.query.order

        zomato.get(`/search?lat=${lat}&lon=${lon}&radius=${radius}&cuisines=1040&sort=${sortBy}&order=${order}`)
            .then(function ({
                data
            }) {
                data = data.restaurants

                // if (sortBy == 'price') {
                //     if (sort == 'desc') {
                //         data = data.sort(function (a, b) {
                //             return b.restaurant.average_cost_for_two - a.restaurant.average_cost_for_two
                //         })
                //     } else {
                //         data = data.sort(function (a, b) {
                //             return a.restaurant.average_cost_for_two - b.restaurant.average_cost_for_two
                //         })
                //     }
                // }

                res.status(200).json(data)
            })
            .catch(function ({
                err
            }) {
                res.status(500).json({
                    msg: err.message
                })
            })
    }
}

module.exports = Zomato