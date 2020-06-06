import { ArgsType, Field, Int } from 'type-graphql';
import { orderByInput } from '../../shared/schema/orderByInput';

@ArgsType()
export class getTrailsRequest {
    @Field((type) => Int)
    offset: number;

    @Field((type) => Int)
    pageSize: number;

    @Field((type) => [orderByInput], {
        nullable: true,
        defaultValue: [new orderByInput()],
    })
    orderBy: orderByInput[];

    @Field((type) => String, { nullable: true })
    mountain: string;

    @Field((type) => String, { nullable: true })
    maintainer: string;

    @Field((type) => Int, { nullable: true })
    distance: number;

    @Field((type) => String, { nullable: true })
    duration: string;
}
