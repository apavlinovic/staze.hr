const { SingleResponse } = require('../responses/SingleResponse');
const { GetUserById } = require('../../database/readonly/user.query');

module.exports = SingleResponse(
    (routeParams) => GetUserById(routeParams.userId),
    ['userId'],
    false,
);
