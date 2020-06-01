const { createHash } = require('crypto');

function Hashify(password = '') {
    const hash = createHash('sha512');

    return hash.update(password).digest('hex');
}

module.exports = {
    Hashify,
};
