import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class LoginResponse {
    @Field()
    token: String;
}
