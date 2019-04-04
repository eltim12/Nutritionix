const axios = require('axios')

var zomato = axios.create({
    baseURL: 'https://developers.zomato.com/api/v2.1',
    timeout: 2000
});

zomato.defaults.headers.common['user-key'] = process.env.ZOMATO_KEY;

class Zomato {
    static getNearby(req, res) {
        console.log(req.query)
        let lat = req.query.lat
        let lon = req.query.lon
        let radius = req.query.radius
        zomato.get(`/search?lat=${lat}&lon=${lon}&radius=${radius}&cuisines=1040`)
        .then(function({data}){
            res.status(200).json(data)
        })
        .catch(function({err}){
            res.status(500).json({msg : err})
        })
    }
}

module.exports = Zomato