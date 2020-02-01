const NodeCache = require('node-cache')
const stazeHRCache = new NodeCache({
    stdTTL: 0
});

module.exports = {
    Cache: stazeHRCache
}