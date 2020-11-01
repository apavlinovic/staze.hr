import { Field, Int, ObjectType } from 'type-graphql';

import { Trail } from './trail.model';
import { DEFAULT_PAGE_SIZE } from '../../../config';

@ObjectType()
export class PaginatedTrailsResponse {
    @Field((type) => [Trail])
    items: Trail[];

    @Field((type) => Int)
    total: number;

    @Field((type) => Int, {
        defaultValue: DEFAULT_PAGE_SIZE,
    })
    pageSize: number;

    @Field((type) => Int)
    offset: number;
}
