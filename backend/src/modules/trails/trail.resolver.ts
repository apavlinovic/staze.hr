import { Trail } from './schema/trail.model';
import { isWhiteSpaceOrNull } from '../../utils/string.utils';

import { getRepository, createQueryBuilder } from 'typeorm';
import { Resolver, Query, Arg, Args, FieldResolver, Root } from 'type-graphql';

import { PaginatedTrailsResponse } from './schema/paginatedTrails.response';
import { GetTrailsRequest } from './schema/getTrails.request';
import { Area } from '../areas/schema/area.model';

@Resolver(() => Trail)
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
            .skip(offset);

        if (!isWhiteSpaceOrNull(mountain)) {
            qb.innerJoin('trail.area', 'area', 'area.slug = :mountain', {
                mountain,
            });
        }

        if (!isWhiteSpaceOrNull(maintainer)) {
            qb.andWhere('trail.maintainer = :maintainer', { maintainer });
        }

        if (distance) {
            qb.andWhere('trail.distance <= :distance', { distance });
        }

        if (!isWhiteSpaceOrNull(duration)) {
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

        if (orderBy) {
            orderBy.forEach((order) =>
                qb.addOrderBy(order.column, order.direction),
            );
        }

        return qb.getManyAndCount().then((value) => {
            return {
                items: value[0],
                total: value[1],
                pageSize: pageSize,
                offset: offset,
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
        let where: Array<Object> = [];

        if (trailId) {
            where.push({ id: trailId });
        }

        if (!isWhiteSpaceOrNull(trailSlug)) {
            where.push({ slug: trailSlug });
        }

        if (!where.length) {
            return null;
        }

        return getRepository(Trail).findOne({ where });
    }

    @FieldResolver()
    area(@Root() trail: Trail): Promise<Area> {
        return createQueryBuilder(Area, 'area')
            .andWhere('area.id = :areaId', { areaId: trail.areaId })
            .getOne();
    }
}
