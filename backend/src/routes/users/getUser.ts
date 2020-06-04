import { SingleResponse } from '../responses/SingleResponse';
import { GetUserById } from '../../database/readonly/user.query';

export const GetUserByIdRoute = SingleResponse(
    (routeParams) => GetUserById(routeParams.userId),
    ['userId'],
    false,
);
