require('dotenv').config();

import express from 'express';

import { ApolloServer } from 'apollo-server-express';
import 'reflect-metadata';
import './database/db-connection';

import { buildSchema } from 'type-graphql';
import { TrailResolver } from './modules/trails/trail.resolver';
import { AreaResolver } from './modules/areas/area.resolver';
import { UserResolver } from './modules/users/user.resolver';
import { AuthResolver } from './modules/auth/auth.resolver';
import { SearchResolver } from './modules/search/search.resolver';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
    const expressServer = express();

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
    const apolloServer = new ApolloServer({
        schema,
        playground: true,
    });

    apolloServer.applyMiddleware({ app: expressServer });

    // Start the server
    await expressServer.listen({ port: PORT });

    console.log(
        `Server is running, GraphQL Playground available at ${apolloServer.graphqlPath}`,
    );
}

bootstrap();
