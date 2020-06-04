import { createHash } from 'crypto';

export function Hashify(password = '') {
    const hash = createHash('sha512');

    return hash.update(password).digest('hex');
}
