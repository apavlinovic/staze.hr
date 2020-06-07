import { Trail } from './schema/trail';
import { FindConditions, LessThanOrEqual, getRepository } from 'typeorm';
import { Resolver, Query, Arg, Args } from 'type-graphql';

import { PaginatedTrailsResponse } from './schema/paginatedTrailsResponse';
import { GetTrailsRequest } from './schema/getTrailsRequest';

@Resolver()
export class TrailResolver {
    @Query(() => PaginatedTrailsResponse, {
        name: 'trails',
    })
    async getTrails(
        @Args()
        {
            pageSize,
            offset,
            orderBy,
            mountain,
            maintainer,
            distance,
            duration,
        }: GetTrailsRequest,
    ): Promise<PaginatedTrailsResponse> {
        let whereStatement: FindConditions<Trail> = {};

        if (mountain) {
            whereStatement.mountain = mountain;
        }

        if (maintainer) {
            whereStatement.maintainer = maintainer;
        }

        if (distance) {
            whereStatement.distance = LessThanOrEqual(distance);
        }

        // TODO: This doesn't actually work. Needs to call DB Func to convert to timestamp
        if (duration) {
            whereStatement.duration = LessThanOrEqual(duration);
        }

        const sortHashMap: any = {};
        orderBy.forEach(
            (order) => (sortHashMap[order.column] = order.direction),
        );

        return getRepository(Trail)
            .findAndCount({
                take: pageSize,
                skip: offset,
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

    @Query(() => Trail, {
        name: 'trail',
    })
    async getTrail(
        @Arg('trailId', {
            nullable: true,
        })
        trailId: Number = null,
        @Arg('trailSlug') trailSlug: string = '',
    ) {
        return getRepository(Trail).findOne({
            where: [
                {
                    id: trailId,
                },
                {
                    slug: trailSlug,
                },
            ],
        });
    }
}
