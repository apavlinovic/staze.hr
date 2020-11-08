import { Field, Int, ObjectType } from 'type-graphql';

import { DEFAULT_PAGE_SIZE } from '../../../config';
import { Area } from './area.model';

@ObjectType()
export class PaginatedAreasResponse {
    @Field((type) => [Area])
    items: Area[];

    @Field((type) => Int)
    total: number;

    @Field((type) => Int, {
        defaultValue: DEFAULT_PAGE_SIZE,
    })
    pageSize: number;

    @Field((type) => Int)
    offset: number;
}
