import { Arg, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

import { SearchResponse } from './schema/search.response';
import { SearchResult } from './schema/searchResult.model';

import { Trail } from '../trails/schema/trail.model';
import { SearchResultType } from './enums/resultType';
import { isWhiteSpaceOrNull } from '../../utils/string.utils';
import { RESULT_LIMIT_PER_SEARCH_BRANCH } from '../../config';

const EMPTY_RESPONSE = new SearchResponse();

@Resolver()
export class SearchResolver {
    @Query(() => SearchResponse, { name: 'globalSearch', defaultValue: [] })
    async globalSearch(
        @Arg('query') query: string = '',
    ): Promise<SearchResponse> {
        if (isWhiteSpaceOrNull(query)) return EMPTY_RESPONSE;

        var orderedTrailResults = getRepository(Trail)
            .query(
                `select id, name, mountain, distance, duration from trails where name ilike $1
                union all
                select id, name, mountain, distance, duration from trails where name not ilike $1 and (mountain ilike $2 or name ilike $2)
                limit $3`,
                [`${query}%`, `%${query}%`, RESULT_LIMIT_PER_SEARCH_BRANCH],
            )
            .then((trails: Trail[]) =>
                trails.map((t) => {
                    var res = new SearchResult();
                    res.type = SearchResultType.TRAIL;
                    res.id = t.id;
                    res.text = t.name;
                    res.distance = t.distance;
                    res.duration = t.duration;
                    res.area = t.mountain;

                    return res;
                }),
            );

        var mountainResults = getRepository(Trail)
            .query(
                `select distinct mountain from trails where mountain ilike $1 order by mountain limit $2`,
                [`%${query}%`, RESULT_LIMIT_PER_SEARCH_BRANCH / 2],
            )
            .then((trails: Trail[]) =>
                trails.map((t) => {
                    var res = new SearchResult();
                    res.type = SearchResultType.MOUNTAIN;
                    res.text = t.mountain;

                    return res;
                }),
            );

        return Promise.all([mountainResults, orderedTrailResults]).then(
            (results) => {
                var response = new SearchResponse();
                response.results = [].concat.apply([], results);

                return response;
            },
        );
    }
}
