import { Arg, Query, Resolver } from 'type-graphql';
import { createQueryBuilder } from 'typeorm';

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

        var trailResults = createQueryBuilder(Trail, 'trail')
            .limit(RESULT_LIMIT_PER_SEARCH_BRANCH)
            .andWhere(`trail.name like :query`, { query: `%${query}%` })
            .getMany()
            .then((trails) =>
                trails.map((t) => {
                    var res = new SearchResult();
                    res.type = SearchResultType.TRAIL;
                    res.id = t.id;
                    res.text = t.name;
                    res.distance = t.distance;
                    res.duration = t.duration;

                    return res;
                }),
            );

        var mountainResults = createQueryBuilder(Trail, 'trail')
            .limit(RESULT_LIMIT_PER_SEARCH_BRANCH)
            .andWhere(`trail.mountain like :query`, { query: `%${query}` })
            .getMany()
            .then((trails) =>
                trails.map((t) => {
                    var res = new SearchResult();
                    res.type = SearchResultType.MOUNTAIN;
                    res.text = t.mountain;

                    return res;
                }),
            )
            .then((results) => {
                var filterMap = new Map();

                results.forEach((mountain) => {
                    filterMap.set(mountain.text, mountain);
                });

                return [...filterMap.values()];
            });

        return Promise.all([trailResults, mountainResults]).then((results) => {
            var response = new SearchResponse();
            response.results = [].concat.apply([], results);

            return response;
        });
    }
}
