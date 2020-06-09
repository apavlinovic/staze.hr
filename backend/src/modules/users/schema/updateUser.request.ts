import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class UpdateUserRequest {
    @Field((type) => Int, { nullable: true })
    userId: number;

    @Field((type) => String, { nullable: true })
    email: string;

    @Field((type) => String, { nullable: true })
    name: string;

    @Field((type) => String, { nullable: true })
    password: string;

    @Field((type) => String, { nullable: true })
    username: string;

    @Field((type) => String, { nullable: true })
    description: string;
}
