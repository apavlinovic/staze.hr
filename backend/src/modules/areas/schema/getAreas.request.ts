import { ArgsType, Field, Int } from 'type-graphql';
import { OrderBy } from '../../shared/schema/orderBy';
import { DEFAULT_OFFSET, DEFAULT_PAGE_SIZE } from '../../../config';

@ArgsType()
export class GetAreasRequest {
    @Field((type) => Int, {
        nullable: true,
        defaultValue: DEFAULT_OFFSET,
    })
    offset: number;

    @Field((type) => Int, {
        nullable: true,
        defaultValue: DEFAULT_PAGE_SIZE,
    })
    pageSize: number;

    @Field((type) => [OrderBy], {
        nullable: true,
        defaultValue: [new OrderBy('id')],
    })
    orderBy: OrderBy[];
}
