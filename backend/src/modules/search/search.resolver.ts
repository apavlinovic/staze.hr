import { Arg, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

import { SearchResponse } from './schema/search.response';
import { SearchResult } from './schema/searchResult.model';

import { Trail } from '../trails/schema/trail.model';
import { SearchResultType } from './enums/resultType';
import { isWhiteSpaceOrNull } from '../../utils/string.utils';
import { RESULT_LIMIT_PER_SEARCH_BRANCH } from '../../config';
import { DistanceFromGeoPointInput } from '../shared/schema/geoPoint';

const EMPTY_RESPONSE = new SearchResponse();

@Resolver()
export class SearchResolver {
    @Query(() => SearchResponse, { name: 'globalSearch', defaultValue: [] })
    async globalSearch(
        @Arg('query') query: string = '',
        @Arg('nearTo', { nullable: true, validate: false })
        geopoint: DistanceFromGeoPointInput = null,
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

        var nearbyTrailResults = Promise.resolve([]);

        if (geopoint) {
            nearbyTrailResults = getRepository(Trail)
                .query(
                    `select id, name, mountain, distance, duration from trails 
                 where name ilike $1 and ST_Distance("startLocationCoords", ST_GeomFromGeoJSON($2)) < $3
                 limit $4`,
                    [
                        `${query}%`,
                        JSON.stringify({
                            type: 'Point',
                            coordinates: [geopoint.lat, geopoint.long],
                        }),
                        geopoint.distanceFromMeters,
                        RESULT_LIMIT_PER_SEARCH_BRANCH,
                    ],
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
                        res.isNearby = true;

                        return res;
                    }),
                );
        }

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

        return Promise.all([
            mountainResults,
            orderedTrailResults,
            nearbyTrailResults,
        ]).then((results) => {
            var response = new SearchResponse();
            response.results = [].concat.apply([], results);

            return response;
        });
    }
}
