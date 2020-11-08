import { ObjectType } from 'type-graphql';
import { Field } from 'type-graphql';
import { SearchResultType } from '../enums/resultType';

@ObjectType()
export class SearchResult {
    @Field()
    type: SearchResultType;

    @Field((type) => String)
    text: string;

    @Field({ nullable: true, defaultValue: null })
    slug: string;

    @Field({ nullable: true, defaultValue: null })
    id: number;

    @Field({ nullable: true, defaultValue: null })
    distance: number;

    @Field({ nullable: true, defaultValue: null })
    duration: string;

    @Field({ nullable: true, defaultValue: null })
    areaId: number;

    @Field({ nullable: true, defaultValue: null })
    areaName: string;
}
