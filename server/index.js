import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import { mergeResolvers } from '@graphql-tools/merge';
import express from 'express';

import productResolver from './resolvers/productResolver.js';
import ratingResolver from './resolvers/ratingResolver.js';
import userResolver from './resolvers/userResolver.js';

import typeDefs from './typeDefs.js';

mongoose.connect("mongodb://admin:kjottjente1@it2810-10.idi.ntnu.no:27017/productway?authSource=admin&authMechanism=DEFAULT");

mongoose.connection.once('open', () => {
  console.log('Connected to mongoDB');
});

const app = express();

const mergedResolver = mergeResolvers([productResolver, ratingResolver, userResolver]);

const server = new ApolloServer({
  typeDefs,
  resolvers: mergedResolver,
  cors: { origin: true, optionsSuccessStatus: 200, credentials: true },
});

async function startApolloServer() {
  await server.start();

  server.applyMiddleware({ app, cors: { origin: true, optionsSuccessStatus: 200, credentials: true } });

  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://it2810-10.idi.ntnu.no:4000${server.graphqlPath}`);
  });
}

startApolloServer();
