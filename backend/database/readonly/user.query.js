const { User } = require('../models/user.model');
const { Op } = require('sequelize');

function GetUsers(page = 1, pageSize = 20, orderBy = [['UserId', 'asc']]) {
    return User.findAndCountAll({
        limit: pageSize,
        offset: pageSize * (page - 1),
        order: orderBy,
    });
}

function GetUserById(userId = 1) {
    return User.findByPk(userId);
}

function GetUserByEmail(email = 'default@default.com') {
    return User.findOne({
        where: {
            Email: {
                [Op.eq]: email,
            },
        },
    });
}

module.exports = {
    GetUserByEmail,
    GetUserById,
    GetUsers,
};