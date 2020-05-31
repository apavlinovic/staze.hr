const { DatabaseConnection } = require('../db-connection');
const { Model, TEXT, STRING, NUMBER, TIME } = require('sequelize');

class User extends Model {}
User.init(
    {
        UserId: {
            type: NUMBER,
            allowNull: false,
            primaryKey: true,
        },

        Name: {
            type: STRING,
            allowNull: false,
        },

        Email: {
            type: STRING,
            allowNull: false,
        },

        Description: {
            type: TEXT,
        },

        RegisteredOn: {
            type: TIME,
            allowNull: false,
        },
    },
    {
        sequelize: DatabaseConnection,
        tableName: 'users',
    },
);

module.exports = {
    User,
};
