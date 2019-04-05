const axios = require('axios')

var googleapi = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/distancematrix',
    timeout: 2000
});

class GoogleMap{
    static distanceTime(req,res){

        let origin = req.query.origin.split(',')
        let destinations = req.query.destinations.split('|')

        let dest = []
        destinations.map(el => {
            el = el.split(',')
            el = el.join('%2C')
            dest.push(el)
        })

        dest = dest.join('%7C')
        
        googleapi.get(`/json?units=matrix&origins=${origin[0]},${origin[1]}&destinations=${dest}&key=${process.env.GOOGLE_KEY}`)
        .then(({data}) => {
            res.status(200).json(data)
        })
        .catch((err)=>{
            res.status(500).json({msg:err.message})
        })
    }
}

module.exports = GoogleMap
