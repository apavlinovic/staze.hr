const { QueryAPICache } = require('../../services/cache.service');
const { GetAllMountainNames } = require('../../database/readonly/trail.query');

module.exports = async (req, res, next) => {
    let cachedResult = QueryAPICache.get(req.url);
    if (cachedResult) {
        res.status(200).json(cachedResult);
        return;
    }

    await GetAllMountainNames().then(
        (results) => {
            QueryAPICache.set(
                req.url,
                results.map((r) => r.toJSON()),
            );

            res.status(200).json(results);
        },
        (error) => res.status(500).send(error),
    );
};
