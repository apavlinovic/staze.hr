import { ObjectType, Field, Int } from 'type-graphql';
import { toUrlFriendlyString } from './../../../utils/url.utils';

@ObjectType()
export class MountainWithTrailCount {
    constructor(mountain: string, trailCount: number) {
        this.name = mountain;
        this.urlFriendlyName = toUrlFriendlyString(mountain);
        this.trails = trailCount;
    }

    @Field((type) => String, { nullable: true })
    name: string;

    @Field((type) => String, { nullable: true })
    urlFriendlyName: string;

    @Field((type) => Int)
    trails: number;
}
