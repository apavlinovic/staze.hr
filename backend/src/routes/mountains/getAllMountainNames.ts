import { GetAllMountainNames } from '../../database/readonly/trail.query';
import { Request, Response, NextFunction } from 'express';

export async function GetMountainNamesRoute(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const mountains = await GetAllMountainNames();
    response.status(200).json(
        mountains.map((m) => {
            return {
                Mountain: m.mountain,
                TrailCount: m.count,
            };
        }),
    );
}
