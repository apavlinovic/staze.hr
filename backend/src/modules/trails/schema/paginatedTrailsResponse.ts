import { ObjectType } from 'type-graphql';

import { Trail } from './trail';
import { PaginatedResponse } from '../../shared/schema/paginatedResponse';

@ObjectType()
export class PaginatedTrailsResponse extends PaginatedResponse(Trail) {}
