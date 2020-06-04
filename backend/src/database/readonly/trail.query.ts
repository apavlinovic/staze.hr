import { Trail } from '../models/trail.model';
import { DatabaseConnection } from '../db-connection';
import { FindConditions, LessThanOrEqual, OrderByCondition } from 'typeorm';

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
    const connection = await DatabaseConnection;
    const repo = connection.getRepository(Trail);

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

    if (duration) {
        whereStatement.Duration = LessThanOrEqual(duration);
    }

    return repo.findAndCount({
        take: pageSize,
        skip: pageSize * (page - 1),
        order: orderBy,
        where: whereStatement,
    });
}

export async function GetAllMountainNames() {
    const connection = await DatabaseConnection;
    const query = connection
        .getRepository(Trail)
        .createQueryBuilder('trail')
        .select([
            'trail.Mountain as "Mountain", COUNT(trail.Mountain) as "TrailCount"',
        ])
        .groupBy('trail.Mountain')
        .orderBy('trail.Mountain', 'ASC');

    return query.getRawMany();
}

export async function GetTrailById(trailId: number = 1) {
    const connection = await DatabaseConnection;
    return connection.getRepository(Trail).findOne({
        where: {
            Id: trailId,
        },
    });
}

export async function GetTrailBySlug(trailSlug: string = '') {
    const connection = await DatabaseConnection;
    return connection.getRepository(Trail).findOne({
        where: {
            Slug: trailSlug,
        },
    });
}
