import { User } from '../models/user.model';
import { DatabaseConnection } from '../db-connection';

export async function GetUsers(
    page: number = 1,
    pageSize: number = 20,
    orderBy: object = { UserId: 'asc' },
) {
    const connection = await DatabaseConnection;
    const repo = connection.getRepository(User);

    return repo.findAndCount({
        take: pageSize,
        skip: pageSize * (page - 1),
        order: orderBy,
    });
}

export async function GetUserById(userId: number = 1) {
    const connection = await DatabaseConnection;
    return connection.getRepository(User).findOne({
        where: {
            UserId: userId,
        },
    });
}

export async function GetUserByEmail(email: string = 'default@default.com') {
    const connection = await DatabaseConnection;
    return connection.getRepository(User).findOne({
        where: {
            Email: email,
        },
    });
}
