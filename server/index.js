const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const { mergeResolvers } = require('@graphql-tools/merge');
const express = require('express');

const productResolver = require('./resolvers/productResolver.js');
const ratingResolver = require('./resolvers/ratingResolver.js');
const userResolver = require('./resolvers/userResolver.js');

const typeDefs = require('./typeDefs');

mongoose.connect("mongodb://admin:kjottjente1@it2810-10.idi.ntnu.no:27017/productway?authSource=admin&authMechanism=DEFAULT", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('Connected to database JA');
});

const app = express();

const mergedResolver = mergeResolvers([productResolver, ratingResolver, userResolver])

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
