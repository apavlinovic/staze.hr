import { Trail } from '../models/trail.model';
import { Op, fn, where, col, cast, Order } from 'sequelize';

export function GetTrails(
    page: number = 1,
    pageSize: number = 20,
    orderBy: Order = [['Id', 'asc']],
    mountain: string = null,
    maintainer: string = null,
    distance: number = null,
    duration: string = null,
) {
    let whereStatement = {
        [Op.and]: [] as Array<any>,
    };

    if (mountain) whereStatement[Op.and].push({ Mountain: mountain });

    if (maintainer) whereStatement[Op.and].push({ Maintainer: maintainer });

    if (distance)
        whereStatement[Op.and].push({
            Distance: { [Op.lte]: distance },
        });

    if (duration)
        whereStatement[Op.and].push(
            where(
                cast(fn('TO_TIMESTAMP', col('Duration'), 'HH24:MI:SS'), 'TIME'),
                {
                    [Op.lte]: duration,
                },
            ),
        );

    return Trail.findAndCountAll({
        limit: pageSize,
        offset: pageSize * (page - 1),
        where: whereStatement,
        order: orderBy,
    });
}

export function GetAllMountainNames(page = 1, pageSize = 20) {
    return Trail.findAndCountAll({
        limit: pageSize,
        offset: pageSize * (page - 1),
        attributes: ['Mountain', [fn('COUNT', 'Mountain'), 'TrailCount']],
        group: 'Mountain',
        order: [['Mountain', 'ASC']],
    });
}

export function GetTrailById(trailId = 1) {
    return Trail.findByPk(trailId);
}

export function GetTrailBySlug(trailSlug = '') {
    return Trail.findOne({
        where: {
            Slug: {
                [Op.eq]: trailSlug,
            },
        },
    });
}
