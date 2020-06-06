import { InputType, Field } from 'type-graphql';

@InputType()
export class orderByInput {
    constructor() {
        this.column = 'Id';
        this.direction = 'ASC';
    }

    @Field(() => String)
    column: string;

    @Field(() => String)
    direction: string;
}
