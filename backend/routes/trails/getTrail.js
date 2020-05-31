const { SingleResponse } = require('../_common/singleResponse');

const {
    GetTrailById,
    GetTrailBySlug,
} = require('../../database/readonly/trail.query');

module.exports = {
    byId: SingleResponse(
        (routeParams) => GetTrailById(routeParams.trailId),
        ['trailId'],
        true,
    ),

    bySlug: SingleResponse(
        (routeParams) => GetTrailBySlug(routeParams.trailSlug),
        ['trailSlug'],
        true,
    ),
};
