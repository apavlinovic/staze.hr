import { Request, Response, NextFunction } from 'express';

import { Create } from '../../database/write/user.writer';

export async function RegistrationRoute(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const { name, email, username, password } = request.body;

    if (!name) {
        next(new Error(`Name can't be null or empty`));
    }

    if (!email) {
        next(new Error(`Email can't be null or empty`));
    }

    if (!username) {
        next(new Error(`Username can't be null or empty`));
    }

    if (!password) {
        next(new Error(`Password can't be null or empty`));
    }

    try {
        const user = await Create(name, email, username, password);
        response.status(200).json(user);
    } catch (error) {
        next(error);
    }
}
