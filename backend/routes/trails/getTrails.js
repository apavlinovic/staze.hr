const { GetTrails } = require('../../database/readonly/trail.query');
const { ListResponse } = require('../_common/ListResponse');

module.exports = ListResponse(
    (page, pageSize, orderBy, queryParams) =>
        GetTrails(
            page,
            pageSize,
            orderBy,
            queryParams.mountain,
            queryParams.maintainer,
            queryParams.distance,
            queryParams.duration,
        ),
    true,
);
