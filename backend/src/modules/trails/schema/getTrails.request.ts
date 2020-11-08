import { ArgsType, Field, Int } from 'type-graphql';
import { OrderBy } from '../../shared/schema/orderBy';
import { DistanceFromGeoPointInput } from '../../shared/schema/geoPoint';
import { DEFAULT_OFFSET, DEFAULT_PAGE_SIZE } from '../../../config';

@ArgsType()
export class GetTrailsRequest {
    @Field((type) => Int, {
        nullable: true,
        defaultValue: DEFAULT_OFFSET,
    })
    offset: number;

    @Field((type) => Int, {
        nullable: true,
        defaultValue: DEFAULT_PAGE_SIZE,
    })
    pageSize: number;

    @Field((type) => [OrderBy], {
        nullable: true,
        defaultValue: [],
    })
    orderBy: OrderBy[];

    @Field((type) => String, { nullable: true })
    mountain: string;

    @Field((type) => String, { nullable: true })
    maintainer: string;

    @Field((type) => Int, { nullable: true })
    distance: number;

    @Field((type) => String, { nullable: true })
    duration: string;

    @Field((type) => DistanceFromGeoPointInput, { nullable: true })
    nearby: DistanceFromGeoPointInput;
}
