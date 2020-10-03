import { hash, compare } from 'bcrypt';

export function equals(password = '', hash = '') {
    return compare(password, hash);
}

export function hashify(password = '') {
    return hash(password, 10);
}
