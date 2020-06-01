const { SingleResponse } = require('../responses/SingleResponse');
const { GetUserByEmail } = require('../../database/readonly/user.query');
const { Hashify } = require('../../services/password.service');
const { GenerateJWT } = require('../../services/auth.service');

module.exports = async function (request, response, next) {
    const { email, password } = request.body;

    if (!email) {
        next(new Error('Email missing in login request.'));
        return;
    }

    if (!password) {
        next(new Error('Password missing in login request.'));
        return;
    }

    const user = await GetUserByEmail(email);
    const passwordHash = Hashify(password);

    if (!user || passwordHash !== user.PasswordHash) {
        next(new Error(`Login failed. Wrong email and password combination.`));
        return;
    }

    const token = await GenerateJWT(user.UserId, email);

    response.status(200).json(token);
};
