const { sign, verify } = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

async function GenerateJWT(userId, email, role) {
    return sign(
        {
            userId,
            email,
            role,
        },
        JWT_SECRET,
        {
            expiresIn: '7d',
        },
    );
}

async function VerifyAndDecodeJWT(token) {
    try {
        const decoded = verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        return error;
    }
}

module.exports = {
    GenerateJWT,
    VerifyAndDecodeJWT,
};
