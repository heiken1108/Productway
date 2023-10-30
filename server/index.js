const express = require("express");
const cors = require('cors')
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

async function startServer() {
    const app = express();
    app.use(cors())
    app.use(express.json())
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    })

    await apolloServer.start();

    apolloServer.applyMiddleware({app: app});

    await mongoose.connect(
        "mongodb+srv://aksman:BGYHWeYkfo413C3C@productway.ftsvyzi.mongodb.net/productway?retryWrites=true&w=majority"
    )

    app.listen(4000, () => console.log("Server er starta (SERVER RUNS PERFECTLY)"))
}
startServer();