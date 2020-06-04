import { Trail } from '../models/trail.model';
import { FindConditions, LessThanOrEqual, getRepository } from 'typeorm';

export async function GetTrails(
    page: number = 1,
    pageSize: number = 20,
    orderBy: object = {
        Id: 'ASC',
    },
    mountain: string = null,
    maintainer: string = null,
    distance: number = null,
    duration: string = null,
) {
    let whereStatement: FindConditions<Trail> = {};

    if (mountain) {
        whereStatement.Mountain = mountain;
    }

    if (maintainer) {
        whereStatement.Maintainer = maintainer;
    }

    if (distance) {
        whereStatement.Distance = LessThanOrEqual(distance);
    }

    // TODO: This doesn't actually work. Needs to call DB Func to convert to timestamp
    if (duration) {
        whereStatement.Duration = LessThanOrEqual(duration);
    }

    return getRepository(Trail).findAndCount({
        take: pageSize,
        skip: pageSize * (page - 1),
        order: orderBy,
        where: whereStatement,
    });
}

export async function GetAllMountainNames() {
    return getRepository(Trail)
        .createQueryBuilder('trail')
        .select([
            'trail.Mountain as "Mountain", COUNT(trail.Mountain) as "TrailCount"',
        ])
        .groupBy('trail.Mountain')
        .orderBy('trail.Mountain', 'ASC')
        .getRawMany();
}

export async function GetTrailById(trailId: number = 1) {
    return getRepository(Trail).findOne({
        where: {
            Id: trailId,
        },
    });
}

export async function GetTrailBySlug(trailSlug: string = '') {
    return getRepository(Trail).findOne({
        where: {
            Slug: trailSlug,
        },
    });
}
