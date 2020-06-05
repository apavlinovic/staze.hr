import { Request, Response, NextFunction } from 'express';
import { VerifyAndDecodeJWT, TokenContent } from '../../services/auth.service';
import { AccountRole } from '../../database/enums/accountRole';
import { GetUserById } from '../../database/readonly/user.query';
import { User } from '../../database/models/user.model';

const BEARER_TOKEN_IDENTIFIER = 'Bearer ';

export interface AuthorizationConfiguration {
    authorizationRequiresUserIdMatch?: boolean;
    allowedRoles?: Array<AccountRole>;
}

export interface AuthorizedRequest extends Request {
    currentUser: User;
}

export function checkIfUserAuthorized(
    settings: AuthorizationConfiguration = {
        authorizationRequiresUserIdMatch: false,
        allowedRoles: [],
    },
) {
    return async function (
        request: Request,
        response: Response,
        next: NextFunction,
    ) {
        const { headers, params } = request;
        const { authorization } = headers;

        if (
            !authorization ||
            !authorization.includes(BEARER_TOKEN_IDENTIFIER)
        ) {
            return _buildErrorResponse(response, 'UNAUTHORIZED');
        }

        const tokenString = authorization.replace(BEARER_TOKEN_IDENTIFIER, '');

        if (!tokenString) {
            return _buildErrorResponse(response, 'TOKEN NOT PROVIDED');
        }

        const token = await VerifyAndDecodeJWT(tokenString);

        if (token instanceof Error) {
            return _buildErrorResponse(response, 'INVALID TOKEN');
        }

        const user = await GetUserById(token.userId);

        if (!user) {
            return _buildErrorResponse(response, `USER DOESN'T EXIST.`);
        }

        if (user.Nonce != token.nonce) {
            return _buildErrorResponse(
                response,
                'OUTDATED TOKEN. PLEASE REAUTHENTICATE.',
            );
        }

        if (user.AccountRole != AccountRole.Admin) {
            if (settings.authorizationRequiresUserIdMatch) {
                if (params['userId'] !== token.userId.toString()) {
                    return _buildErrorResponse(
                        response,
                        'ROUTE NOT AVAILABLE FOR USER',
                    );
                }
            }

            if (settings.allowedRoles && settings.allowedRoles.length > 0) {
                if (!settings.allowedRoles.includes(user.AccountRole)) {
                    return _buildErrorResponse(
                        response,
                        `${AccountRole[
                            user.AccountRole
                        ].toString()} CAN'T ACCESS THIS ROUTE`,
                    );
                }
            }
        }

        (request as AuthorizedRequest).currentUser = user;
        next();
    };
}

function _buildErrorResponse(response: Response, message: string) {
    return response.status(401).json({
        status: 401,
        message: message,
    });
}
