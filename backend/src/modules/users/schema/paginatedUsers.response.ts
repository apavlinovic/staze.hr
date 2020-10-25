import { Field, ObjectType, Int } from 'type-graphql';

import { User } from './user.model';
import { DEFAULT_PAGE_SIZE } from '../../../config';

@ObjectType()
export class PaginatedUsersResponse {
    @Field((type) => [User])
    items: User[];

    @Field((type) => Int)
    total: number;

    @Field((type) => Int, {
        defaultValue: DEFAULT_PAGE_SIZE,
    })
    pageSize: number;

    @Field((type) => Int)
    offset: number;
}
