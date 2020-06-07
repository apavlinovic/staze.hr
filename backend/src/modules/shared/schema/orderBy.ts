import { InputType, Field } from 'type-graphql';

@InputType()
export class OrderBy {
    @Field(() => String)
    column: string = 'id';

    @Field(() => String)
    direction: 'ASC' | 'DESC' = 'ASC';
}
