import { Hashify } from '../../services/password.service';
import { User } from './user.model';
import { AccountStatus } from './enums/accountStatus';
import { getRepository } from 'typeorm';
import { AccountRole } from './enums/accountRole';
import { generateNonce } from '../../services/auth.service';

export async function Create(
    name: string,
    email: string,
    username: string,
    password: string,
) {
    const user = new User();
    user.name = name;
    user.email = email;
    user.username = username;
    user.passwordHash = Hashify(password);
    user.nonce = generateNonce();

    return getRepository(User).save(user);
}

export async function Update(
    userId: number,
    name: string,
    email: string,
    username: string,
    description: string = '',
) {
    const user = await _findByUserId(userId);
    user.name = name;
    user.username = username;
    user.description = description;

    if (user.email != email) {
        user.email = email;
        user.nonce = generateNonce();
    }

    return getRepository(User).save(user);
}

export async function ChangePassword(userId: number, password: string) {
    return getRepository(User).update(
        {
            userId: userId,
        },
        {
            nonce: generateNonce(),
            passwordHash: Hashify(password),
        },
    );
}

export async function Delete(userId: number) {
    return getRepository(User).update(
        {
            userId: userId,
        },
        {
            nonce: generateNonce(),
            accountStatus: AccountStatus.DELETED,
        },
    );
}

export async function ChangeRole(userId: number, role: AccountRole) {
    return getRepository(User).update(
        {
            userId: userId,
        },
        {
            nonce: generateNonce(),
            accountRole: role,
        },
    );
}

async function _findByUserId(userId: number) {
    return getRepository(User).findOne({
        where: {
            userId: userId,
        },
    });
}
