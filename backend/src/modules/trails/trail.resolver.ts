import { Trail } from './trail.model';
import { FindConditions, LessThanOrEqual, getRepository } from 'typeorm';
import { Resolver, Query, Arg, Args } from 'type-graphql';

import { paginatedTrailsResponse } from './schema/paginatedTrailsResponse';
import { getTrailsRequest } from './schema/getTrailsRequest';

@Resolver()
export class TrailResolver {
    @Query(() => paginatedTrailsResponse)
    async trails(
        @Args()
        {
            pageSize,
            offset,
            orderBy,
            mountain,
            maintainer,
            distance,
            duration,
        }: getTrailsRequest,
    ): Promise<paginatedTrailsResponse> {
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

    @Query(() => Trail)
    async trailWithId(@Arg('trailId') trailId: Number = 1) {
        return getRepository(Trail).findOne({
            where: {
                Id: trailId,
            },
        });
    }

    @Query(() => Trail)
    async trailWithSlug(@Arg('trailSlug') trailSlug: string = '') {
        return getRepository(Trail).findOne({
            where: {
                Slug: trailSlug,
            },
        });
    }
}
