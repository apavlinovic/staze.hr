import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export class MountainWithTrailCount {
    constructor(mountain: string, trailCount: number) {
        this.name = mountain;
        this.trails = trailCount;
    }

    @Field((type) => String, { nullable: true })
    name: string;

    @Field((type) => Int)
    trails: number;
}
