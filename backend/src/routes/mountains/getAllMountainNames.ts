import { GetAllMountainNames } from '../../database/readonly/trail.query';
import { SingleResponse } from '../responses/SingleResponse';

export const GetMountainNamesRoute = SingleResponse(
    (params) => GetAllMountainNames(),
    [],
    true,
);
