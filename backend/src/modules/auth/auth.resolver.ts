import { Resolver, Query, Arg } from 'type-graphql';
import { getRepository } from 'typeorm';
import { ApolloError } from 'apollo-server';

import { User } from '../users/schema/user.model';
import { equals } from '../../services/password.service';
import { generateJWT } from '../../services/auth.service';
import { LoginResponse } from './schema/login.response';
import { isWhiteSpaceOrNull } from '../../utils/string.utils';

@Resolver()
export class AuthResolver {
    @Query(() => LoginResponse, { name: 'login' })
    async tryLoginUser(
        @Arg('email') email: string = null,
        @Arg('password') password: string = null,
    ) {
        if (isWhiteSpaceOrNull(email) || isWhiteSpaceOrNull(password)) {
            throw new ApolloError(`Email and password can't be empty.`);
        }

        return getRepository(User)
            .findOne({ email: email })
            .then(async (user) => {
                if (!user) {
                    throw new ApolloError(
                        'User not found for provided email address.',
                    );
                }

                if (equals(password, user.passwordHash)) {
                    const response = new LoginResponse();
                    response.token = await generateJWT(user.id, user.nonce);

                    return response;
                }

                throw new ApolloError(
                    'Login attempt failed. Check your email and password.',
                );
            });
    }
}
