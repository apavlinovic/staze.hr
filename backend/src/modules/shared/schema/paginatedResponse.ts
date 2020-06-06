import { ClassType, ObjectType, Field, Int } from 'type-graphql';

export function paginatedResponse<TItem>(TItemClass: ClassType<TItem>) {
    // `isAbstract` decorator option is mandatory to prevent registering in schema
    @ObjectType({ isAbstract: true })
    abstract class paginatedResponseClass {
        // here we use the runtime argument
        @Field((type) => [TItemClass])
        // and here the generic type
        items: TItem[];

        @Field((type) => Int)
        total: number;
    }

    return paginatedResponseClass;
}
