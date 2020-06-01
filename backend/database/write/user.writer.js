const { Op } = require('sequelize');

const { Hashify } = require('../../services/password.service');
const { User } = require('../models/user.model');
const { ACCOUNT_DELETED } = require('../enums/accountStatus.enum');

async function Create(name, email, username, password) {
    return User.create({
        Name: name,
        Email: email,
        Username: username,
        PasswordHash: Hashify(password),
    });
}

async function Update(userId, name, email, username, description = '') {
    const user = await _findByUserId(userId);

    return user.update({
        Name: name,
        Email: email,
        Username: username,
        Description: description,
    });
}

async function ChangePassword(userId, password) {
    const user = await _findByUserId(userId);

    return user.update({
        PasswordHash: Hashify(password),
    });
}

async function Delete(userId) {
    const user = await _findByUserId(userId);

    return user.update({
        AccountStatus: ACCOUNT_DELETED,
    });
}

async function _findByUserId(userId) {
    return User.findOne({
        where: {
            UserId: {
                [Op.eq]: userId,
            },
        },
    });
}

module.exports = {
    Update,
    Create,
    Delete,
    ChangePassword,
};
