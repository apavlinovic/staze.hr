import { TrailQuery } from '../../database/readonly/trail.query';
import { SingleResponse } from '../responses/SingleResponse';

const query = new TrailQuery();

export const GetMountainNamesRoute = SingleResponse(
    (params) => query.GetAllMountainNames(),
    [],
    true,
);
