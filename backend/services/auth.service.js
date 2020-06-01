const { sign } = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

async function GenerateJWT(userId, email) {
    return sign(
        {
            sub: userId,
            email: email,
        },
        JWT_SECRET,
        {
            expiresIn: '7d',
        },
    );
}

module.exports = {
    GenerateJWT,
};
