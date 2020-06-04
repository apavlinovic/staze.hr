import { DatabaseConnection } from '../db-connection';
import {
    Model,
    STRING,
    NUMBER,
    TIME,
    DECIMAL,
    BOOLEAN,
    GEOGRAPHY,
} from 'sequelize';

export class Trail extends Model {}
Trail.init(
    {
        Id: {
            type: NUMBER,
            allowNull: false,
            primaryKey: true,
        },

        Name: {
            type: STRING,
            allowNull: false,
        },

        Description: {
            type: STRING,
        },

        Type: {
            type: STRING,
            allowNull: false,
        },

        Slug: {
            type: STRING,
            allowNull: false,
        },

        Mountain: {
            type: STRING,
            allowNull: false,
        },

        ModifiedOn: {
            type: TIME,
            allowNull: false,
        },

        Maintainer: {
            type: STRING,
        },

        Distance: {
            type: DECIMAL,
        },

        Duration: {
            type: STRING,
        },

        HeightDifference: {
            type: STRING,
        },

        RelatedInformationLink: {
            type: STRING,
        },

        HasValidGpx: {
            type: BOOLEAN,
            allowNull: false,
        },

        GpxTraceId: {
            type: STRING,
        },

        GpxTraceUrl: {
            type: STRING,
        },

        MapName: {
            type: STRING,
        },

        OriginalMapUrl: {
            type: STRING,
        },

        StartLocation: {
            type: STRING,
        },

        StartLocationCoords: {
            type: GEOGRAPHY('POINT', 4326),
        },

        EndLocation: {
            type: STRING,
        },

        EndLocationCoords: {
            type: GEOGRAPHY('POINT', 4326),
        },
    },
    {
        sequelize: DatabaseConnection,
        tableName: 'trails',
    },
);
