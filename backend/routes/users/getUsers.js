const { ListResponse } = require('../responses/listResponse');
const { GetUsers } = require('../../database/readonly/user.query');

module.exports = ListResponse(
    (page, pageSize, orderBy, params) => GetUsers(page, pageSize, orderBy),
    false,
);
