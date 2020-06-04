import { Op } from 'sequelize';

import { Hashify } from '../../services/password.service';
import { User } from '../models/user.model';
import { AccountStatus } from '../enums/accountStatus.enum';

export async function Create(
    name: string,
    email: string,
    username: string,
    password: string,
) {
    return User.create({
        Name: name,
        Email: email,
        Username: username,
        PasswordHash: Hashify(password),
    });
}

export async function Update(
    userId: number,
    name: string,
    email: string,
    username: string,
    description: string = '',
) {
    const user = await _findByUserId(userId);

    return user.update({
        Name: name,
        Email: email,
        Username: username,
        Description: description,
    });
}

export async function ChangePassword(userId: number, password: string) {
    const user = await _findByUserId(userId);

    return user.update({
        PasswordHash: Hashify(password),
    });
}

export async function Delete(userId: number) {
    const user = await _findByUserId(userId);

    return user.update({
        AccountStatus: AccountStatus.Deleted,
    });
}

async function _findByUserId(userId: number) {
    return User.findOne({
        where: {
            UserId: {
                [Op.eq]: userId,
            },
        },
    });
}
