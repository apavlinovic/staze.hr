import { hash, compare } from 'bcrypt';

export async function equals(password = '', hash = '') {
    return compare(password, hash);
}

export async function hashify(password = '') {
    return hash(password, 10);
}
