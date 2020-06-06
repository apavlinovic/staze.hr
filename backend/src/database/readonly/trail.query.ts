import { Trail } from '../models/trail.model';
import { FindConditions, LessThanOrEqual, getRepository } from 'typeorm';
import {
    Resolver,
    Query,
    Arg,
    ArgsType,
    Field,
    Int,
    Args,
    InputType,
    ObjectType,
    ClassType,
} from 'type-graphql';

@InputType()
export class OrderBy {
    constructor() {
        this.column = 'Id';
        this.direction = 'ASC';
    }

    @Field(() => String)
    column: string;

    @Field(() => String)
    direction: string;
}

@ArgsType()
class GetTrailsRequest {
    @Field((type) => Int)
    page: number;

    @Field((type) => Int)
    pageSize: number;

    @Field((type) => [OrderBy], {
        nullable: true,
        defaultValue: [new OrderBy()],
    })
    orderBy: OrderBy[];

    @Field((type) => String, { nullable: true })
    mountain: string;

    @Field((type) => String, { nullable: true })
    maintainer: string;

    @Field((type) => String, { nullable: true })
    distance: number;

    @Field((type) => String, { nullable: true })
    duration: string;
}

function PaginatedResponse<TItem>(TItemClass: ClassType<TItem>) {
    // `isAbstract` decorator option is mandatory to prevent registering in schema
    @ObjectType({ isAbstract: true })
    abstract class PaginatedResponseClass {
        // here we use the runtime argument
        @Field((type) => [TItemClass])
        // and here the generic type
        items: TItem[];

        @Field((type) => Int)
        total: number;
    }
    return PaginatedResponseClass;
}

@ObjectType()
class PaginatedTrailsResponse extends PaginatedResponse(Trail) {}

@Resolver()
export class TrailQuery {
    @Query(() => PaginatedTrailsResponse)
    async GetTrails(
        @Args()
        {
            page,
            pageSize,
            orderBy,
            mountain,
            maintainer,
            distance,
            duration,
        }: GetTrailsRequest,
    ): Promise<PaginatedTrailsResponse> {
        let whereStatement: FindConditions<Trail> = {};

        if (mountain) {
            whereStatement.Mountain = mountain;
        }

        if (maintainer) {
            whereStatement.Maintainer = maintainer;
        }

        if (distance) {
            whereStatement.Distance = LessThanOrEqual(distance);
        }

        // TODO: This doesn't actually work. Needs to call DB Func to convert to timestamp
        if (duration) {
            whereStatement.Duration = LessThanOrEqual(duration);
        }

        const sortHashMap: any = {};
        orderBy.forEach(
            (order) => (sortHashMap[order.column] = order.direction),
        );

        return getRepository(Trail)
            .findAndCount({
                take: pageSize,
                skip: pageSize * (page - 1),
                order: sortHashMap,
                where: whereStatement,
            })
            .then((value) => {
                return {
                    items: value[0],
                    total: value[1],
                };
            });
    }

    async GetAllMountainNames() {
        return getRepository(Trail)
            .createQueryBuilder('trail')
            .select([
                'trail.Mountain as "Mountain", COUNT(trail.Mountain) as "TrailCount"',
            ])
            .groupBy('trail.Mountain')
            .orderBy('trail.Mountain', 'ASC')
            .getRawMany();
    }

    @Query(() => Trail)
    async GetTrailById(@Arg('trailId') trailId: Number = 1) {
        return getRepository(Trail).findOne({
            where: {
                Id: trailId,
            },
        });
    }

    @Query(() => Trail)
    async GetTrailBySlug(@Arg('trailSlug') trailSlug: string = '') {
        return getRepository(Trail).findOne({
            where: {
                Slug: trailSlug,
            },
        });
    }
}
