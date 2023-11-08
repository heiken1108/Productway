const mongoose = require('mongoose');

mongoose.connect("mongodb://admin:kjottjente1@it2810-10.idi.ntnu.no:27017/productway?authSource=admin&authMechanism=DEFAULT", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.once('open', () => {
    console.log('Connected to database');
});

const express = require("express");
const cors = require('cors')
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const corsOptions = {
    origin: 'http://it2810-10.idi.ntnu.no',
    credentials: true
}

const app = express();
app.use(cors(corsOptions));

const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors: false,
});

async function startApolloServer() {
    await server.start();

    server.applyMiddleware({ app, cors: false });

    app.listen({ port: 4000}, () => {
        console.log(`🚀 Server ready at http://it2810-10.idi.ntnu.no:4000${server.graphqlPath}`);
    });
}

startApolloServer();
