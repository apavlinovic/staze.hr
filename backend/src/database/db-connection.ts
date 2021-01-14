import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User } from '../modules/users/schema/user.model';
import { Trail } from '../modules/trails/schema/trail.model';
import { Area } from '../modules/areas/schema/area.model';

const {
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    NODE_ENV,
} = process.env;

export const DATABASE_CONNECTION = createConnection({
    type: 'postgres',
    host: DB_HOST,
    port: parseInt(DB_PORT),

    database: DB_NAME,
    username: DB_USER,
    password: DB_PASSWORD,

    entities: [User, Trail, Area],
    logging: NODE_ENV === 'development',
})
    .then(() => {
        console.log(
            `✅ Successfully established DB connection to [${DB_HOST}:${DB_PORT}] as user [${DB_USER}]. Happy hacking!`,
        );
    })
    .catch(() => {
        console.error(
            `⚠️  Couldn't etablish a DB connection to [${DB_HOST}:${DB_PORT}] as user [${DB_USER}]. ` +
                `Make sure that you've set your .env file to correct values and that the DB server is up an running.`,
        );
    });
