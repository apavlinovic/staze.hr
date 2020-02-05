const { Trail } = require("./../models/trail.model")
const { Op, fn, literal } = require("sequelize");

function GetTrails(pageSize = 20, page = 1, orderBy = [["Id", "asc"]], mountain = null, maintainer = null, distance = null) {
    let where = {
        [Op.and]: []
    };

    if(mountain)
        where[Op.and].push({ Mountain: mountain })
    
    if(maintainer)
        where[Op.and].push({ Maintainer: maintainer })

    if(distance && parseInt(distance))
        where[Op.and].push({ Distance: { [Op.lte]: parseInt(distance) }})

    return Trail.findAndCountAll({
        limit: pageSize,
        offset: pageSize * (page - 1),
        where,
        order: orderBy
    });
}

function GetTrailMountains() {

    return Trail.findAll({
        attributes: ['Mountain', [fn('COUNT', 'Mountain'), 'TrailCount']],
        group: 'Mountain',
        order: [['Mountain', 'ASC']]
    });
}

function GetTrailById(trailId = 1) {
    return Trail.findByPk(trailId)
}

function GetTrailBySlug(trailSlug = '') {
    return Trail.findOne({
        where: {
            Slug: {
                [Op.eq]: trailSlug
            }
        }
    })
}

module.exports = {
    GetTrailById,
    GetTrailBySlug,
    GetTrails,
    GetTrailMountains
}