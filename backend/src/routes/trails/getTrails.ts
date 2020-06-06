import { TrailQuery } from '../../database/readonly/trail.query';
import { ListResponse } from '../responses/listResponse';

const query = new TrailQuery();

export const GetTrailsRoute = ListResponse(
    (page, pageSize, orderBy, queryParams) =>
        query.GetTrails({
            page: page,
            pageSize: pageSize,
            orderBy: orderBy,
            mountain: queryParams.mountain,
            maintainer: queryParams.maintainer,
            distance: parseInt(queryParams.distance),
            duration: queryParams.duration,
        }),
    true,
);
