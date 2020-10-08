import { CACHED_RESPONSE_TTL_SECONDS } from '../config';

const NodeCache = require('node-cache');

export const QueryAPICache = new NodeCache({
    stdTTL: CACHED_RESPONSE_TTL_SECONDS,
});
