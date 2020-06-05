import { Request, Response, NextFunction } from 'express';

import {
    Update,
    Delete,
    ChangePassword,
    ChangeRole,
} from '../../database/write/user.writer';

export async function UpdateUserRoute(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const { userId } = request.params;
    const { name, email, username, description } = request.body;

    try {
        const user = await Update(
            parseInt(userId),
            name,
            email,
            username,
            description,
        );

        response.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export async function ChangePasswordRoute(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const { userId } = request.params;
    const { password } = request.body;

    if (!password) {
        next(new Error(`Password can't be null or empty`));
    }

    try {
        const user = await ChangePassword(parseInt(userId), password);
        response.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export async function DeleteUserRoute(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const { userId } = request.params;

    try {
        await Delete(parseInt(userId));
        response.status(200).json();
    } catch (error) {
        next(error);
    }
}

export async function ChangeUserRoleRoute(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const { userId, role } = request.params;

    try {
        await ChangeRole(parseInt(userId), parseInt(role));
        response.status(200).json();
    } catch (error) {
        next(error);
    }
}
