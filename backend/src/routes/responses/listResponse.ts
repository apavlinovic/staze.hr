import { Request, Response, NextFunction } from 'express';

import { QueryAPICache } from '../../services/cache.service';

/**
 * @param {function: Promise<any>} resultSupplier - ListResponse endpoints invoke the ResultSupplier to get result data. The supplier is invoked with these parameters:
 * page, pageSize, orderBy, queryParams.
 * @param {boolean} allowResponseCaching - If set to true, this endpoint will return cached results.
 */
export function ListResponse(
    resultSupplier = (
        page: number,
        pageSize: number,
        orderBy: object,
        queryParams: any,
    ) => new Promise(() => {}),
    allowResponseCaching: boolean = false,
) {
    return async function (
        request: Request,
        response: Response,
        next: NextFunction,
    ) {
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

        let hydratedOrderBy: any = {};
        if (orderBy) {
            const parsedOrderBy = (orderBy as string)
                .split('~')
                .map((order) => {
                    return order.split('-');
                });

            parsedOrderBy.forEach((element) => {
                hydratedOrderBy[element[0]] = hydratedOrderBy[1];
            });
        }

        const resultSupplierPromise = resultSupplier(
            parseInt(page as string),
            parseInt(pageSize as string),
            hydratedOrderBy,
            query,
        );

        if (!resultSupplierPromise.then) {
            next(new Error('ResultSupplier has to return a Promise object'));
            return;
        }

        await resultSupplierPromise.then(
            (results: any) => {
                const adaptedResults = {
                    rows: results[0],
                    count: results[1],
                };

                if (allowResponseCaching) {
                    QueryAPICache.set(url, adaptedResults);
                }

                response.status(200).json(adaptedResults);
            },
            (error) => {
                response.status(500).send(error);
            },
        );
    };
}
