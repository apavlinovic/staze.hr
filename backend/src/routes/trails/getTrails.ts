import { GetTrails } from '../../database/readonly/trail.query';
import { ListResponse } from '../responses/listResponse';

export const GetTrailsRoute = ListResponse(
    (page, pageSize, orderBy, queryParams) =>
        GetTrails(
            page,
            pageSize,
            orderBy,
            queryParams.mountain,
            queryParams.maintainer,
            parseInt(queryParams.distance),
            queryParams.duration,
        ),
    true,
);
