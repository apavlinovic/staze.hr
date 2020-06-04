import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User } from './models/user.model';
import { Trail } from './models/trail.model';

export const DatabaseConnection = createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),

    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,

    entities: [User, Trail],
    logging: true,
});
