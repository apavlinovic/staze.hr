import { ObjectType } from 'type-graphql';

import { PaginatedResponse } from '../../shared/schema/paginated.response';
import { User } from './user.model';

@ObjectType()
export class PaginatedUsersResponse extends PaginatedResponse(User) {}
