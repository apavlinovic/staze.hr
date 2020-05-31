const { DatabaseConnection } = require('../db-connection');
const { Model, TEXT, STRING, NUMBER, TIME, BOOLEAN } = require('sequelize');

class User extends Model {}
User.init(
    {
        UserId: {
            type: NUMBER,
            autoIncrement: true,
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
            allowNull: true,
        },

        RegisteredOn: {
            type: TIME,
            allowNull: false,
            defaultValue: new Date(),
        },

        IsAdmin: {
            type: BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },

        AccountStatus: {
            type: NUMBER,
            allowNull: false,
            defaultValue: 0,
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
