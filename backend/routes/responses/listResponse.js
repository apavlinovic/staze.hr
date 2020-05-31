const { QueryAPICache } = require('../../services/cache.service');

/**
 * @param {function: Promise<any>} resultSupplier - ListResponse endpoints invoke the ResultSupplier to get result data. The supplier is invoked with these parameters:
 * page, pageSize, orderBy, queryParams.
 * @param {boolean} allowResponseCaching - If set to true, this endpoint will return cached results.
 */
function ListResponse(
    resultSupplier = (page, pageSize, orderBy, queryParams) => new Promise(),
    allowResponseCaching = false,
) {
    return async function (request, response, next) {
        const { url, query } = request;
        const { page, pageSize, orderBy } = query;

        if (!resultSupplier) {
            next(
                new Error(
                    "ListResponse can't work without a provided ResultSupplier.",
                ),
            );

            return;
        }

        if (!page || !pageSize) {
            next(
                new Error(
                    'ListResponse endpoints have to be called with page and pageSize query parameters.',
                ),
            );

            return;
        }

        if (allowResponseCaching) {
            const cachedResult = QueryAPICache.get(url);

            if (cachedResult) {
                response.status(200).json(cachedResult);
                return;
            }
        }

        let hydratedOrderBy = undefined;
        if (orderBy) {
            hydratedOrderBy = orderBy.split('~').map((order) => {
                return order.split('-');
            });
        }

        const resultSupplierPromise = resultSupplier(
            page,
            pageSize,
            hydratedOrderBy,
            query,
        );

        if (!resultSupplierPromise.then) {
            next(new Error('ResultSupplier has to return a Promise object'));
            return;
        }

        await resultSupplier(page, pageSize, hydratedOrderBy, query).then(
            (results) => {
                if (allowResponseCaching && results) {
                    QueryAPICache.set(url, {
                        rows: results.rows.map((result) => result.toJSON()),
                        count: results.count,
                    });
                }

                response.status(200).json(results);
            },
            (error) => {
                response.status(500).send(error);
            },
        );
    };
}

module.exports = {
    ListResponse,
};
