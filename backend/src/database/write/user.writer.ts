import { Hashify } from '../../services/password.service';
import { User } from '../models/user.model';
import { AccountStatus } from '../enums/accountStatus';
import { DatabaseConnection } from '../db-connection';

export async function Create(
    name: string,
    email: string,
    username: string,
    password: string,
) {
    const connection = await DatabaseConnection;
    const repo = connection.getRepository(User);

    const user = new User();

    user.Name = name;
    user.Email = email;
    user.Username = username;
    user.PasswordHash = Hashify(password);

    return repo.save(user);
}

export async function Update(
    userId: number,
    name: string,
    email: string,
    username: string,
    description: string = '',
) {
    const user = await _findByUserId(userId);

    const connection = await DatabaseConnection;
    const repo = connection.getRepository(User);

    user.Name = name;
    user.Email = email;
    user.Username = username;
    user.Description = description;

    return repo.save(user);
}

export async function ChangePassword(userId: number, password: string) {
    const user = await _findByUserId(userId);
    const connection = await DatabaseConnection;
    const repo = connection.getRepository(User);

    user.PasswordHash = Hashify(password);

    return repo.save(user);
}

export async function Delete(userId: number) {
    const user = await _findByUserId(userId);
    const connection = await DatabaseConnection;
    const repo = connection.getRepository(User);

    user.AccountStatus = AccountStatus.Deleted;

    return repo.save(user);
}

async function _findByUserId(userId: number) {
    const connection = await DatabaseConnection;

    return connection.getRepository(User).findOne({
        where: {
            UserId: userId,
        },
    });
}
