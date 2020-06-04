import { GetAllMountainNames } from '../../database/readonly/trail.query';
import { ListResponse } from '../responses/listResponse';

export const GetMountainNamesRoute = ListResponse(
    (page, pageSize, orderBy, queryParams) =>
        GetAllMountainNames(page, pageSize),
    true,
);
