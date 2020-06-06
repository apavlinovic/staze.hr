import { SingleResponse } from '../responses/singleResponse';

import { TrailQuery } from '../../database/readonly/trail.query';

const query = new TrailQuery();

export const GetTrailByIdRoute = SingleResponse(
    (routeParams) => query.GetTrailById(routeParams.trailId),
    ['trailId'],
    true,
);

export const GetTrailBySlugRoute = SingleResponse(
    (routeParams) => query.GetTrailBySlug(routeParams.trailSlug),
    ['trailSlug'],
    true,
);
