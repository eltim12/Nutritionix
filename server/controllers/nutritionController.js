const axios = require('axios')

module.exports = {

    getArticle(req, res) {
        let allArticle = []
        axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json?q=coffee&api-key=6MbRR86hmXGLbdd6xbpxKzZsUfxHlkqX')
            .then(({ data }) => {
                data.response.docs.map(e => {
                    allArticle.push({
                        head: e.snippet,
                        link: e.web_url
                    })
                })
                res.status(200).json(allArticle)
            })
            .catch(err => {
                console.log(err)
            })
    }
}