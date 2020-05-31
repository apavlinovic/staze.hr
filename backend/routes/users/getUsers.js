const { ListResponse } = require('../_common/ListResponse');
const { GetUsers } = require('../../database/readonly/user.query');

module.exports = ListResponse(
    (page, pageSize, orderBy, params) => GetUsers(page, pageSize, orderBy),
    true,
);
