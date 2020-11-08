import { Arg, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

import { SearchResponse } from './schema/search.response';
import { SearchResult } from './schema/searchResult.model';

import { Trail } from '../trails/schema/trail.model';
import { SearchResultType } from './enums/resultType';
import { isWhiteSpaceOrNull } from '../../utils/string.utils';
import { RESULT_LIMIT_PER_SEARCH_BRANCH } from '../../config';

const EMPTY_RESPONSE = new SearchResponse();

interface DBSearchResutlt {
    name: string;
    id: number;
    slug: string;
    distance: number;
    duration: string;
    areaId: number;
    areaName: string;
    type: SearchResultType;
}

@Resolver()
export class SearchResolver {
    @Query(() => SearchResponse, { name: 'globalSearch', defaultValue: [] })
    async globalSearch(
        @Arg('query') query: string = '',
    ): Promise<SearchResponse> {
        if (isWhiteSpaceOrNull(query)) return EMPTY_RESPONSE;

        var orderedTrailResults = getRepository(Trail)
            .query(
                `
                (select 
                    area."id" as "id", area.name as "name", area."id" as "areaId", 
                    NULL as "distance", NULL as "duration", area."slug" as "slug", 
                    area.name as "areaName", ${SearchResultType.AREA} as "type"
                from areas area
                where area.name ilike $1 or area.name ilike $2
                limit $3)
                
                union all

                (select 
                    trail.id as "id", trail.name as "name", trail."areaId" as "areaId", 
                    trail.distance as "distance", trail.duration as "duration", trail."slug" as "slug", 
                    area.name as "areaName", ${SearchResultType.TRAIL} as "type"
                from trails trail inner join areas area on trail."areaId" = area.id
                where trail.name ilike $1 or trail.name ilike $2 
                limit $3)
                `,
                [`${query}%`, `%${query}%`, RESULT_LIMIT_PER_SEARCH_BRANCH],
            )
            .then((trails: DBSearchResutlt[]) =>
                trails.map((t) => {
                    var res = new SearchResult();
                    res.type = SearchResultType.TRAIL;
                    res.id = t.id;
                    res.text = t.name;
                    res.type = t.type;
                    res.distance = t.distance;
                    res.duration = t.duration;
                    res.areaId = t.areaId;
                    res.areaName = t.areaName;
                    res.slug = t.slug;

                    return res;
                }),
            );

        return Promise.all([orderedTrailResults]).then((results) => {
            var response = new SearchResponse();
            response.results = [].concat.apply([], results);

            return response;
        });
    }
}
