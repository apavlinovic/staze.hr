const { QueryAPICache } = require('../../services/cache.service');

/**
 * @param {function: Promise<any>} resultSupplier - ListResponse endpoints invoke the ResultSupplier to get result data. The supplier is invoked with Route Parameters:
 * @param {boolean} allowResponseCaching - If set to true, this endpoint will return cached results.
 */
function SingleResponse(
    resultSupplier = (routeParams) => new Promise(),
    requiredParameters = [],
    allowResponseCaching = false,
) {
    return async function (request, response, next) {
        const { url, params } = request;

        if (!resultSupplier) {
            next(
                new Error(
                    "SingleResponse can't work without a provided ResultSupplier.",
                ),
            );

            return;
        }

        try {
            _validateRequiredParametersArePresent(params, requiredParameters);
        } catch (error) {
            next(error);
            return;
        }

        if (allowResponseCaching) {
            const cachedResult = QueryAPICache.get(url);

            if (cachedResult) {
                response.status(200).json(cachedResult);
                return;
            }
        }

        const resultSupplierPromise = resultSupplier(params);

        if (!resultSupplierPromise.then) {
            next(new Error('ResultSupplier has to return a Promise object'));
            return;
        }

        await resultSupplierPromise.then(
            (result) => {
                if (allowResponseCaching && result && result.toJSON) {
                    QueryAPICache.set(url, result.toJSON());
                }

                response.status(200).json(result);
            },
            (error) => response.status(500).send(error),
        );
    };
}

function _validateRequiredParametersArePresent(routeParams, requiredParmeters) {
    const presentParameters = Object.keys(routeParams);

    for (const param of requiredParmeters) {
        if (!presentParameters.includes(param)) {
            throw new Error(`Required Route Parameter ${param} not provided`);
        }
    }
}

module.exports = {
    SingleResponse,
};
