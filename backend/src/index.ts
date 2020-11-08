require('dotenv').config();

import 'reflect-metadata';
import './database/db-connection';

import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { TrailResolver } from './modules/trails/trail.resolver';
import { AreaResolver } from './modules/areas/area.resolver';
import { UserResolver } from './modules/users/user.resolver';
import { AuthResolver } from './modules/auth/auth.resolver';
import { SearchResolver } from './modules/search/search.resolver';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
    const schema = await buildSchema({
        validate: true,
        resolvers: [
            TrailResolver,
            AreaResolver,
            UserResolver,
            SearchResolver,
            AuthResolver,
        ],
    });

    // Create the GraphQL server
    const server = new ApolloServer({
        schema,
        playground: true,
    });

    // Start the server
    const { url } = await server.listen(PORT);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap();
