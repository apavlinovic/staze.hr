import { InputType, Field } from 'type-graphql';

@InputType()
export class OrderBy {
    constructor(column: string) {
        this.column = column;
    }

    @Field(() => String)
    column: string = 'id';

    @Field(() => String)
    direction: 'ASC' | 'DESC' = 'ASC';

    toJSON() {
        return { [this.column]: this.direction };
    }
}
