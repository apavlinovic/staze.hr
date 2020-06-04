import { Request, Response, NextFunction } from 'express';

import { GetUserByEmail } from '../../database/readonly/user.query';
import { Hashify } from '../../services/password.service';
import { GenerateJWT } from '../../services/auth.service';

export async function LoginRoute(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const { email, password } = request.body;

    if (!email) {
        next(new Error('Email missing in login request.'));
        return;
    }

    if (!password) {
        next(new Error('Password missing in login request.'));
        return;
    }

    const user: any = await GetUserByEmail(email);
    const passwordHash = Hashify(password);

    if (!user || passwordHash !== user.PasswordHash) {
        next(new Error(`Login failed. Wrong email and password combination.`));
        return;
    }

    const token = await GenerateJWT(user.UserId, user.Email, user.AccountRole);

    response.status(200).json(token);
}
