import { Hashify } from '../../services/password.service';
import { User } from '../models/user.model';
import { AccountStatus } from '../enums/accountStatus';
import { getRepository } from 'typeorm';
import { AccountRole } from '../enums/accountRole';
import { GenerateNonce } from '../../services/auth.service';

export async function Create(
    name: string,
    email: string,
    username: string,
    password: string,
) {
    const user = new User();
    user.Name = name;
    user.Email = email;
    user.Username = username;
    user.PasswordHash = Hashify(password);
    user.Nonce = GenerateNonce();

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
    user.Name = name;
    user.Username = username;
    user.Description = description;

    if (user.Email != email) {
        user.Email = email;
        user.Nonce = GenerateNonce();
    }

    return getRepository(User).save(user);
}

export async function ChangePassword(userId: number, password: string) {
    return getRepository(User).update(
        {
            UserId: userId,
        },
        {
            Nonce: GenerateNonce(),
            PasswordHash: Hashify(password),
        },
    );
}

export async function Delete(userId: number) {
    return getRepository(User).update(
        {
            UserId: userId,
        },
        {
            Nonce: GenerateNonce(),
            AccountStatus: AccountStatus.Deleted,
        },
    );
}

export async function ChangeRole(userId: number, role: AccountRole) {
    return getRepository(User).update(
        {
            UserId: userId,
        },
        {
            Nonce: GenerateNonce(),
            AccountRole: role,
        },
    );
}

async function _findByUserId(userId: number) {
    return getRepository(User).findOne({
        where: {
            UserId: userId,
        },
    });
}
