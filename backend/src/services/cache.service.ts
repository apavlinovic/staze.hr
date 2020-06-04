const NodeCache = require('node-cache');

const { CACHED_RESPONSE_TTL_SECONDS } = process.env;

export const QueryAPICache = new NodeCache({
    stdTTL: CACHED_RESPONSE_TTL_SECONDS,
});
