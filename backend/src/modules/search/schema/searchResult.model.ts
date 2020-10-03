import { ObjectType } from 'type-graphql';
import { Field } from 'type-graphql';
import { SearchResultType } from '../enums/resultType';

@ObjectType()
export class SearchResult {
    @Field((type) => SearchResultType)
    type: SearchResultType;

    @Field((type) => String)
    text: string;
}
