const { Trail } = require("../models/trail.model")
const { Op, fn, where, col, cast } = require("sequelize");

function GetTrails(
    pageSize = 20, 
    page = 1, 
    orderBy = [["Id", "asc"]], 
    mountain = null, 
    maintainer = null, 
    distance = null, 
    duration = null
) {

    let whereStatement = {
        [Op.and]: []
    };    

    if(mountain)
        whereStatement[Op.and].push({ Mountain: mountain })
    
    if(maintainer)
        whereStatement[Op.and].push({ Maintainer: maintainer })

    if(distance && parseInt(distance)) 
        whereStatement[Op.and].push({ Distance: { [Op.lte]: parseInt(distance) }})

    if(duration)
        whereStatement[Op.and].push(where(
            cast(fn("TO_TIMESTAMP", col('Duration'), 'HH24:MI:SS'), 'TIME'), {
                [Op.lte]: duration
            }
        ))

    return Trail.findAndCountAll({
        limit: pageSize,
        offset: pageSize * (page - 1),
        where: whereStatement,
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