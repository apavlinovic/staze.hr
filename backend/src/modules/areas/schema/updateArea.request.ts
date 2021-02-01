import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class UpdateAreaRequest {
    @Field((type) => Int, { nullable: false })
    areaId: number;

    @Field((type) => Int, { nullable: true })
    type: number;

    @Field((type) => String, { nullable: false })
    name: string;

    @Field((type) => String, { nullable: true })
    description: string;
}
