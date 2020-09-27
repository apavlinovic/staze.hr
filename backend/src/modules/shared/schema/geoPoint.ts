import { ObjectType, Field, InputType } from 'type-graphql';

@ObjectType()
export class GeoPoint {
    @Field()
    type: string;

    @Field((type) => [Number, Number])
    coordinates: Array<Number>;
}

@InputType()
export class DistanceFromGeoPointInput {
    @Field()
    lat: Number;

    @Field()
    long: Number;

    @Field()
    distanceFromMeters: Number;
}
