import { User } from './schema/user.model';
import { getRepository } from 'typeorm';
import { Resolver, Query, Arg, Mutation, Args } from 'type-graphql';

import { OrderBy } from '../shared/schema/orderBy';
import { UpdateUserRequest } from './schema/updateUserRequest';
import { generateNonce } from '../../services/auth.service';
import { createPasswordHash } from '../../services/password.service';
import { ApolloError } from 'apollo-server';
import { AccountRole } from './enums/accountRole';
import { AccountStatus } from './enums/accountStatus';
import { PaginatedUsersResponse } from './schema/paginatedUsersResponse';

@Resolver()
export class UserResolver {
    @Query(() => PaginatedUsersResponse, { name: 'users', defaultValue: [] })
    async getUsers(
        @Arg('offset') offset: number = 0,
        @Arg('limit') limit: number = 20,
        @Arg('orderBy') orderBy: OrderBy,
    ): Promise<PaginatedUsersResponse> {
        return getRepository(User)
            .findAndCount({
                take: limit,
                skip: offset,
                order: orderBy.toJSON(),
            })
            .then((value) => {
                return {
                    items: value[0],
                    total: value[1],
                };
            });
    }

    @Query(() => User, { name: 'user', defaultValue: new User() })
    async getUser(
        @Arg('userId', { nullable: true }) userId: number = null,
        @Arg('email', { nullable: true }) email: string = null,
    ) {
        return getRepository(User)
            .find({
                where: [
                    {
                        userId: userId,
                    },
                    {
                        email: email,
                    },
                ],
            })
            .then((value) => value[0]);
    }

    @Mutation(() => User, {
        name: 'updateUser',
    })
    async updateUser(
        @Args()
        {
            userId = null,
            email,
            name,
            username,
            password,
            description,
        }: UpdateUserRequest,
    ) {
        const user = await this.getUser(userId, email);

        if (!user) {
            throw new ApolloError(
                `User with userId [${userId}] or email [${email}] not found.`,
            );
        }

        if (email && email != user.email) {
            user.email = email;
            user.nonce = generateNonce();
        }

        if (name) {
            user.name = name;
        }

        if (username) {
            user.username = username;
        }

        if (description) {
            user.description = description;
        }

        if (password) {
            user.passwordHash = createPasswordHash(password);
            user.nonce = generateNonce();
        }

        return getRepository(User).save(user);
    }

    @Mutation(() => User, {
        name: 'createUser',
    })
    async createUser(
        @Args()
        { name, username, email, password }: UpdateUserRequest,
    ) {
        if (!email || !password) {
            throw new ApolloError(
                `Both email and password are required to create a user`,
            );
        }

        const user = new User();
        user.name = name;
        user.username = username;
        user.email = email;
        user.passwordHash = createPasswordHash(password);
        user.nonce = generateNonce();
        user.accountRole = AccountRole.MEMBER;
        user.accountStatus = AccountStatus.ACTIVE;

        return getRepository(User).save(user);
    }
}
