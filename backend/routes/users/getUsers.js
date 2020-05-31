const { GetUsers } = require('../../database/readonly/user.query');
const { QueryAPICache } = require('../../services/cache.service');

module.exports = async (req, res, next) => {
    let cachedResult = QueryAPICache.get(req.url);
    if (cachedResult) {
        res.status(200).json(cachedResult);
        return;
    }

    let { pageSize, page, orderBy } = req.query;

    if (orderBy) {
        orderBy = orderBy.split('~');
        orderBy = orderBy.map((order) => {
            return order.split('-');
        });
    }

    await GetUsers(pageSize, page, orderBy).then(
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
