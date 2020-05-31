const { GetAllMountainNames } = require('../../database/readonly/trail.query');
const { ListResponse } = require('../_common/ListResponse');

module.exports = ListResponse(
    (page, pageSize, orderBy, queryParams) =>
        GetAllMountainNames(page, pageSize),
    true,
);
