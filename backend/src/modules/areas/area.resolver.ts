import { Resolver, Query, Arg, Args } from 'type-graphql';
import { createQueryBuilder, getRepository } from 'typeorm';

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
        @Arg('areaSlug', {
            nullable: true,
        })
        areaSlug: string = '',
    ) {
        if (isWhiteSpaceOrNull(areaSlug)) {
            return null;
        }

        return getRepository(Area).findOne({ slug: areaSlug });
    }
}
