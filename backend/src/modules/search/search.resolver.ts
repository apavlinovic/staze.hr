import { Arg, Query, Resolver } from 'type-graphql';
import { createQueryBuilder } from 'typeorm';

import { SearchResponse } from './schema/search.response';
import { SearchResult } from './schema/searchResult.model';

import { Trail } from '../trails/schema/trail.model';
import { SearchResultType } from './enums/resultType';

const RESULT_LIMIT_PER_SEARCH_BRANCH = 10;

@Resolver()
export class SearchResolver {
    @Query(() => SearchResponse, { name: 'globalSearch', defaultValue: [] })
    async globalSearch(
        @Arg('query') query: string = '',
    ): Promise<SearchResponse> {
        var trailResults = createQueryBuilder(Trail, 'trail')
            .limit(RESULT_LIMIT_PER_SEARCH_BRANCH)
            .andWhere(`trail.name like ':query%'`, { query })
            .getMany()
            .then((trails) =>
                trails.map((t) => {
                    var res = new SearchResult();
                    res.text = t.name;
                    res.type = SearchResultType.TRAIL;

                    return res;
                }),
            );

        var mountainResults = createQueryBuilder(Trail, 'trail')
            .limit(RESULT_LIMIT_PER_SEARCH_BRANCH)
            .andWhere(`trail.mountain like ':query%'`, { query })
            .getMany()
            .then((trails) =>
                trails.map((t) => {
                    var res = new SearchResult();
                    res.text = t.mountain;
                    res.type = SearchResultType.MOUNTAIN;

                    return res;
                }),
            );

        return Promise.all([trailResults, mountainResults]).then((results) => {
            var response = new SearchResponse();

            response.results = [].concat.apply([], results);
            return response;
        });
    }
}
