const { GetTrails } = require('../../database/readonly/trail.query');
const { QueryAPICache } = require('../../services/cache.service');

module.exports = async (req, res, next) => {
    let cachedResult = QueryAPICache.get(req.url);
    if (cachedResult) {
        res.status(200).json(cachedResult);
        return;
    }

    let { pageSize, page, orderBy, mountain, maintainer, distance, duration } = req.query;

    if (orderBy) {
        orderBy = orderBy.split('~');
        orderBy = orderBy.map((order) => {
            return order.split('-');
        });
    }

    await GetTrails(pageSize, page, orderBy, mountain, maintainer, distance, duration).then(
        (results) => {
            QueryAPICache.set(req.url, {
                rows: results.rows.map((r) => r.toJSON()),
                count: results.count,
            });

            res.status(200).json(results);
        },
        (error) => {
            res.status(500).send(error);
        },
    );
};
