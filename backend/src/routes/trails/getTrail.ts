import { SingleResponse } from '../responses/singleResponse';

import {
    GetTrailById,
    GetTrailBySlug,
} from '../../database/readonly/trail.query';

export const GetTrailByIdRoute = SingleResponse(
    (routeParams) => GetTrailById(routeParams.trailId),
    ['trailId'],
    true,
);

export const GetTrailBySlugRoute = SingleResponse(
    (routeParams) => GetTrailBySlug(routeParams.trailSlug),
    ['trailSlug'],
    true,
);
