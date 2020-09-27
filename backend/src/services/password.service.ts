import { createHash } from 'crypto';

export function equals(password = '', hash = '') {
    return this.hashify(password) === hash;
}

export function hashify(password = '') {
    const hash = createHash('sha512');
    return hash.update(password).digest('hex');
}
