import { User } from './schema/user.model';
import { getRepository } from 'typeorm';
import { Resolver, Query, Arg, Mutation, Args } from 'type-graphql';
import { ApolloError } from 'apollo-server';

import { OrderBy } from '../shared/schema/orderBy';
import { UpdateUserRequest } from './schema/updateUser.request';
import { generateNonce } from '../../services/auth.service';
import { hashify, equals } from '../../services/password.service';
import { AccountRole } from './enums/accountRole';
import { AccountStatus } from './enums/accountStatus';
import { PaginatedUsersResponse } from './schema/paginatedUsers.response';
import { isWhiteSpaceOrNull } from '../../utils/string.utils';
import { DEFAULT_OFFSET, DEFAULT_PAGE_SIZE } from '../../config';

@Resolver()
export class UserResolver {
    @Query(() => PaginatedUsersResponse, { name: 'users', defaultValue: [] })
    async getUsers(
        @Arg('offset', { nullable: true }) offset: number = DEFAULT_OFFSET,
        @Arg('pageSize', { nullable: true })
        pageSize: number = DEFAULT_PAGE_SIZE,
        @Arg('orderBy', { nullable: true })
        orderBy: OrderBy = new OrderBy('userId'),
    ): Promise<PaginatedUsersResponse> {
        return getRepository(User)
            .findAndCount({
                take: pageSize,
                skip: offset,
                order: orderBy.toJSON(),
            })
            .then((value) => {
                return {
                    items: value[0],
                    total: value[1],
                    pageSize: pageSize,
                    offset,
                };
            });
    }

    @Query(() => User, { name: 'user', defaultValue: new User() })
    async getUser(
        @Arg('userId', { nullable: true }) userId: number = null,
        @Arg('email', { nullable: true }) email: string = null,
    ) {
        let where: Array<Object> = [];

        if (userId) {
            where.push({ userId });
        }

        if (!isWhiteSpaceOrNull(email)) {
            where.push({ email });
        }

        if (!where.length) {
            return null;
        }

        return getRepository(User).findOne({ where });
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

        if (password) {
            const isSamePassword = await equals(password, user.passwordHash);

            if (!isSamePassword) {
                user.passwordHash = await hashify(password);
                user.nonce = generateNonce();
            }
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
        user.passwordHash = await hashify(password);
        user.nonce = generateNonce();
        user.accountRole = AccountRole.MEMBER;
        user.accountStatus = AccountStatus.ACTIVE;

        return getRepository(User).save(user);
    }
}
