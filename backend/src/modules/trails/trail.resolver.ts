import { Trail } from './schema/trail.model';
import { getRepository, createQueryBuilder } from 'typeorm';
import { Resolver, Query, Arg, Args } from 'type-graphql';

import { PaginatedTrailsResponse } from './schema/paginatedTrails.response';
import { GetTrailsRequest } from './schema/getTrails.request';

@Resolver()
export class TrailResolver {
    @Query(() => PaginatedTrailsResponse, {
        name: 'trails',
        defaultValue: [],
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
            nearby,
        }: GetTrailsRequest,
    ): Promise<PaginatedTrailsResponse> {
        var qb = createQueryBuilder(Trail, 'trail')
            .take(pageSize)
            .offset(offset);

        if (mountain) {
            qb.andWhere('trail.mountain = :mountain', { mountain });
        }

        if (maintainer) {
            qb.andWhere('trail.maintainer = :maintainer', { maintainer });
        }

        if (distance) {
            qb.andWhere('trail.distance <= :distance', { distance });
        }

        if (duration) {
            qb.andWhere(
                `case when trail.duration is null 
                    then true
                    else to_timestamp(trail.duration, 'HH24:MI') <= to_timestamp(:duration, 'HH24:MI')
                end`,
                { duration },
            );
        }

        if (nearby) {
            qb.andWhere(
                'ST_Distance(trail.startLocationCoords, ST_GeomFromGeoJSON(:origin)) < :distanceFrom',
                {
                    origin: JSON.stringify({
                        type: 'Point',
                        coordinates: [nearby.lat, nearby.long],
                    }),

                    distanceFrom: nearby.distanceFromMeters,
                },
            );
        }

        orderBy.forEach((order) =>
            qb.addOrderBy(order.column, order.direction),
        );

        return qb.getManyAndCount().then((value) => {
            return {
                items: value[0],
                total: value[1],
            };
        });
    }

    @Query(() => Trail, {
        name: 'trail',
        description: 'Loads Trail information',
        defaultValue: new Trail(),
    })
    async getTrail(
        @Arg('trailId', {
            nullable: true,
        })
        trailId: Number = null,
        @Arg('trailSlug', {
            nullable: true,
        })
        trailSlug: string = '',
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
