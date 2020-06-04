import { User } from '../models/user.model';
import { Op, Order } from 'sequelize';

export function GetUsers(
    page: number = 1,
    pageSize: number = 20,
    orderBy: Order = [['UserId', 'asc']],
) {
    return User.findAndCountAll({
        limit: pageSize,
        offset: pageSize * (page - 1),
        order: orderBy,
    });
}

export function GetUserById(userId: number = 1) {
    return User.findByPk(userId);
}

export function GetUserByEmail(email: string = 'default@default.com') {
    return User.findOne({
        where: {
            Email: {
                [Op.eq]: email,
            },
        },
    });
}
