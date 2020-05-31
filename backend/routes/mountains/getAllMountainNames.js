const { GetAllMountainNames } = require('../../database/readonly/trail.query');
const { ListResponse } = require('../_common/listResponse');

module.exports = ListResponse(
    (page, pageSize, orderBy, queryParams) =>
        GetAllMountainNames(page, pageSize),
    true,
);
