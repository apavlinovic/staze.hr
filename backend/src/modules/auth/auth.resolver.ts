import { Resolver, Query, Arg } from 'type-graphql';
import { getRepository } from 'typeorm';

import { User } from '../users/schema/user.model';
import { equals } from '../../services/password.service';
import { generateJWT } from '../../services/auth.service';
import { ApolloError } from 'apollo-server';
import { LoginResponse } from './schema/login.response';

@Resolver()
export class AuthResolver {
    @Query(() => LoginResponse, { name: 'login' })
    async tryLoginUser(
        @Arg('email') email: string = null,
        @Arg('password') password: string = null,
    ) {
        return getRepository(User)
            .findOne({ email: email })
            .then(async (user) => {
                if (!user) {
                    throw new ApolloError('User not found.');
                }

                if (equals(password, user.passwordHash)) {
                    const response = new LoginResponse();
                    response.token = await generateJWT(user.userId, user.nonce);

                    return response;
                }

                throw new ApolloError(
                    'Login attempt failed. Check your email and password.',
                );
            });
    }
}
