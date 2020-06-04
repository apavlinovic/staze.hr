import { Hashify } from '../../services/password.service';
import { User } from '../models/user.model';
import { AccountStatus } from '../enums/accountStatus';
import { getRepository } from 'typeorm';

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
    user.Email = email;
    user.Username = username;
    user.Description = description;

    return getRepository(User).save(user);
}

export async function ChangePassword(userId: number, password: string) {
    const user = await _findByUserId(userId);
    user.PasswordHash = Hashify(password);

    return getRepository(User).save(user);
}

export async function Delete(userId: number) {
    const user = await _findByUserId(userId);
    user.AccountStatus = AccountStatus.Deleted;

    return getRepository(User).save(user);
}

async function _findByUserId(userId: number) {
    return getRepository(User).findOne({
        where: {
            UserId: userId,
        },
    });
}
