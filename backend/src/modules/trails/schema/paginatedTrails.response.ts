import { ObjectType } from 'type-graphql';

import { Trail } from './trail.model';
import { PaginatedResponse } from '../../shared/schema/paginated.response';

@ObjectType()
export class PaginatedTrailsResponse extends PaginatedResponse(Trail) {}
