const NodeCache = require('node-cache')

module.exports = {
    QueryAPICache: new NodeCache({
        stdTTL: 0
    }),

    WeatherCache: new NodeCache({
        stdTTL: 6 * 3600 // number of hours * seconds in an hour
    })
}