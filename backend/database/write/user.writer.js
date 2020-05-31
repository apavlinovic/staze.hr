const { Op } = require('sequelize');

const { User } = require('../models/user.model');
const { ACCOUNT_DELETED } = require('../enums/accountStatus.enum');

async function Create(name, email) {
    return User.create({
        Name: name,
        Email: email,
    });
}

async function Update(userId, name, email, description) {
    const user = await User.findOne({
        where: {
            UserId: {
                [Op.eq]: userId,
            },
        },
    });

    return user.update({
        Name: name,
        Email: email,
        Description: description,
    });
}

async function Delete(userId) {
    const user = await User.findOne({
        where: {
            UserId: {
                [Op.eq]: userId,
            },
        },
    });

    return user.update({
        AccountStatus: ACCOUNT_DELETED,
    });
}

module.exports = {
    Update,
    Create,
    Delete,
};
