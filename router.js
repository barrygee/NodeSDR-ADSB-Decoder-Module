const express     = require('express')
const adsbDecoder = require('./adsb-decoder')
const status      = require('./config/status.json')
const config      = require('./config/config.json')

function routes(utils) {
    const router = express.Router()

    router.get('/', (req, res) => {
        const content = req.query.error ? req.query.error : 'ADSB data'
        res.send(content)
    })

    router.get('/data', (req, res) => {
        const data = utils.connectToDataStream(config.adsb.host, config.adsb.port)
              data.on('data', data => adsbDecoder.decode(data.toString()))
              data.on('error', () => res.send(`${status.UNABLE_TO_CONNECT} ${config.adsb.host}:${config.adsb.port}`)) 
        
        res.send('Decoding ADS-B Data')
    })

    return router
}

module.exports = {  
    routes : routes
}