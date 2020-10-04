import { ObjectType, Field } from 'type-graphql';
import { SearchResult } from './searchResult.model';

@ObjectType()
export class SearchResponse {
    @Field((type) => [SearchResult])
    results: SearchResult[];
}
