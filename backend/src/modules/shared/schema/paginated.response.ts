import { DEFAULT_PAGE_SIZE } from '../../../config';
import { ClassType, ObjectType, Field, Int } from 'type-graphql';

export function PaginatedResponse<TItem>(TItemClass: ClassType<TItem>) {
    // `isAbstract` decorator option is mandatory to prevent registering in schema
    @ObjectType({ isAbstract: true })
    abstract class PaginatedResponseClass {
        // here we use the runtime argument
        @Field((type) => [TItemClass])
        // and here the generic type
        items: TItem[];

        @Field((type) => Int)
        total: number;

        @Field((type) => Int, {
            defaultValue: DEFAULT_PAGE_SIZE,
        })
        pageSize: number;

        @Field((type) => Int)
        offset: number;
    }

    return PaginatedResponseClass;
}
