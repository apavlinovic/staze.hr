const { VerifyAndDecodeJWT } = require('../../services/auth.service');

const BEARER_TOKEN_IDENTIFIER = 'Bearer ';

async function checkIfUserAuthorized(request, response, next) {
    const { headers } = request;
    const { authorization } = headers;

    if (authorization) {
        if (authorization.includes(BEARER_TOKEN_IDENTIFIER)) {
            const token = authorization.replace(BEARER_TOKEN_IDENTIFIER, '');
            const tokenData = await VerifyAndDecodeJWT(token);

            if (tokenData instanceof Error) {
                return response.status(401).json({
                    status: 401,
                    message: 'INVALID TOKEN',
                });
            } else {
                request.accessToken = tokenData;
                next();
            }
        }
    } else {
        return response.status(401).json({
            status: 401,
            message: 'INVALID TOKEN',
        });
    }
}

module.exports = {
    checkIfUserAuthorized,
};
