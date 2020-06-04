import { DatabaseConnection } from '../db-connection';
import { Model, TEXT, STRING, NUMBER, TIME, BOOLEAN } from 'sequelize';

export class User extends Model {}
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

        Username: {
            type: STRING,
            allowNull: false,
        },

        PasswordHash: {
            type: TEXT,
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

        AccountRole: {
            type: NUMBER,
            allowNull: false,
            defaultValue: 0,
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
