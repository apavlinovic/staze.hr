import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class GeoPoint {
    @Field()
    type: string;

    @Field((type) => [Number, Number])
    coordinates: Array<Number>;
}
