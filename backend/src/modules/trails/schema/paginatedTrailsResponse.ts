import { ObjectType } from 'type-graphql';

import { Trail } from '../trail.model';
import { paginatedResponse } from '../../shared/schema/paginatedResponse';

@ObjectType()
export class paginatedTrailsResponse extends paginatedResponse(Trail) {}
