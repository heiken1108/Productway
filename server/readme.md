# Server

The server is written in Javascript and uses the following technologies:

-   Apollo Server - GraphQL server
-   GraphQL - Query language for APIs
-   Mongoose - MongoDB object modeling
-   Node.js - JavaScript runtime

The group chose to use Express and Apollo Server to create a the server. The server is connected to a MongoDB database, which is hosted on a NTNU Virtual Machine.
[http://it2810-10.idi.ntnu.no:4000](http://it2810-10.idi.ntnu.no:4000)

The database features a collection of products, facilitating searches and information retrieval about various items. It includes tables for storing user information and product ratings. The server is hosted on an NTNU Virtual Machine, connected to the client via a proxy. The server operates on port 4000, while the client is accessible on port 5173.

Express was chosen due to its lightweight nature, user-friendliness, and extensive documentation. It provides an easy setup for servers. Apollo Server, a GraphQL server, enables queries and mutations to the database. GraphQL's simplicity in interacting with databases and the straightforward setup of Apollo Server influenced its selection. MongoDB, a NoSQL database, was chosen for its ease of use, well-documented nature, and high speed.

Approximately 5000 products populate the database, sourced from the Kassalapp-API, a Norwegian API containing grocery product information. A Python script sequentially fetched items from the API, subjecting them to a filter, and then posting them to our database. The filter criteria included category inclusion within nine specified categories, a defined price, name, description, etc. The decision to include 5000 items was based on the desire for a sufficiently large dataset to test the application, yet small enough to maintain efficient fetching times.

Backend-server functionality encompasses search, filtering, and ordering, meticulously set up in the resolvers. Optimized MongoDB queries efficiently explore the database, offering the frontend flexibility with various query variations. For instance, users can collect all items matching a query or impose limitations on the number of results, a feature later used for implementing pagination of products.

## Structure

The server is organized into the following folders and files:

-   `database`: Contains a Python script for populating the database.
-   `models`: Includes models for Product, Rating, and User.
-   `resolvers`: Encompasses resolvers for Product, Rating, and User.

Additionally, there are two key files:

-   `index.ts`: Contains the code required to initiate the server.
-   `typeDefs.js`: Holds the schema and types for the GraphQL API.

# Database

This project utilizes MongoDB as its database, hosted on the group's virtual machine at NTNU.

## Collections

The database comprises the following collections:

-   `products` - Grocery products commonly found in grocery stores.
-   `ratings` - Holds the ratings assigned to products.
-   `users` - Collection of users along with their favorite products and ratings.

The `products` collection contains all the products in the database. Here, all relevant information about each product is stored.

The `ratings` collection contains all the ratings in the database. Here, the ProductID (not the ObjectID of a product) is stored to refer to a Product, as well as a number to represent the value of the rating.

The `users` collection contains all the users in the database. It does not contain username and password, but instead a user is identified by its UUID (Unique User ID). This is also stored as a Localstorage-cookie in the browser, and if the user does not have one stored, it generates a new one and posts it as a new user in the database. A user stores directly an array of its favorites and the ratings it has given. A favorite is a direct referal to a Product, while a rating is a direct referal to a Rating.
