import { ListResponse } from '../responses/listResponse';
import { GetUsers } from '../../database/readonly/user.query';

export const GetUsersRoute = ListResponse(
    (page, pageSize, orderBy, params) => GetUsers(page, pageSize, orderBy),
    false,
);
