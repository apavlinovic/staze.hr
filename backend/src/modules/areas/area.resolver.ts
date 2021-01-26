import { Resolver, Query, Arg, Args, Mutation } from 'type-graphql';
import { createQueryBuilder, getRepository } from 'typeorm';
import { UpdateAreaRequest } from './schema/updateArea.request';
import { ApolloError } from 'apollo-server';

import { Area } from './schema/area.model';
import { GetAreasRequest } from './schema/getAreas.request';
import { PaginatedAreasResponse } from './schema/paginatedAreas.response';
import { isWhiteSpaceOrNull } from './../../utils/string.utils';

@Resolver()
export class AreaResolver {
    @Query(() => PaginatedAreasResponse, {
        name: 'areas',
        defaultValue: [],
    })
    async getAreas(
        @Args()
        { pageSize, offset, orderBy }: GetAreasRequest,
    ): Promise<PaginatedAreasResponse> {
        var qb = createQueryBuilder(Area, 'area').take(pageSize).skip(offset);

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

    @Query(() => Area, {
        name: 'area',
        description: 'Loads Area information',
        defaultValue: new Area(),
    })
    async getArea(
        @Arg('areaSlug', { nullable: true })
        areaSlug: string = '',

        @Arg('areaId', { nullable: true })
        areaId: number = 0,
    ) {
        if (isWhiteSpaceOrNull(areaSlug) && areaId == null) {
            return null;
        }

        if (!isWhiteSpaceOrNull(areaSlug)) {
            return getRepository(Area).findOne({
                slug: areaSlug,
            });
        }

        return getRepository(Area).findOne({
            id: areaId,
        });
    }

    @Mutation(() => Area, {
        name: 'updateArea',
    })
    async updateArea(
        @Args()
        { areaId, type, name, description }: UpdateAreaRequest,
    ) {
        const area = await getRepository(Area).findOne(areaId);

        if (!area) {
            throw new ApolloError(`Area with areaId [${areaId}] not found.`);
        }

        if (type) {
            area.type = type;
        }

        if (name) {
            area.name = name;
        }

        if (description) {
            area.description = description;
        }

        return getRepository(Area).save(area);
    }
}
