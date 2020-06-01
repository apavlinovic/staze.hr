const { GetAllMountainNames } = require('../../database/readonly/trail.query');
const { ListResponse } = require('../responses/listResponse');

module.exports = ListResponse(
    (page, pageSize, orderBy, queryParams) =>
        GetAllMountainNames(page, pageSize),
    true,
);
