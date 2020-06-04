import { Request, Response, NextFunction } from 'express';

import { QueryAPICache } from '../../services/cache.service';
import { Order } from 'sequelize/types';

/**
 * @param {function: Promise<any>} resultSupplier - ListResponse endpoints invoke the ResultSupplier to get result data. The supplier is invoked with these parameters:
 * page, pageSize, orderBy, queryParams.
 * @param {boolean} allowResponseCaching - If set to true, this endpoint will return cached results.
 */
export function ListResponse(
    resultSupplier = (
        page: number,
        pageSize: number,
        orderBy: Order,
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

        let hydratedOrderBy: any = undefined;
        if (orderBy) {
            hydratedOrderBy = (orderBy as string).split('~').map((order) => {
                return order.split('-');
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
                if (allowResponseCaching && results) {
                    QueryAPICache.set(url, {
                        rows: results.rows.map((result: any) =>
                            result.toJSON(),
                        ),
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
