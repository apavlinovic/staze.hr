import { User } from '../models/user.model';
import { getRepository } from 'typeorm';

export async function GetUsers(
    page: number = 1,
    pageSize: number = 20,
    orderBy: object = { UserId: 'asc' },
) {
    return getRepository(User).findAndCount({
        take: pageSize,
        skip: pageSize * (page - 1),
        order: orderBy,
    });
}

export async function GetUserById(userId: number = 1) {
    return getRepository(User).findOne({
        where: {
            UserId: userId,
        },
    });
}

export async function GetUserByEmail(email: string = 'default@default.com') {
    return getRepository(User).findOne({
        where: {
            Email: email,
        },
    });
}
