## Project 2

VM-passord: kjottjente1

# Productway
The application allows a user to search for groceryproducts in order to look up information, such as price, rate the product or favorite it. It uses a pre-populated database of products and their information to present the information and perform searches. The user is able to search by name, filter by one or more categories, include a price range, and order the presented items by price


## Installation and running the project

1. Clone the repository and and navigate to the project directory

2. Navigate to the server-repository and start the server by running the following commands:
```
cd server
npm install
npm start
```
3. Open a new terminal

4. Navigate to the client-repository and start the client by running the following commands:
```
cd client
npm install
npm run dev
```
5. Open a browser and navigate to [http://localhost:5173/](http://localhost:5173/) to view the project

NB: The backend is hosted on a NTNU Virtual Machine. In order for the connection to the backend to be working, the user must be connected to the NTNU network (either by being on campus or using VPN). If the user is not connected to the NTNU network, the user can still view the project, but the connection to the backend will not be working, deeming the application functionless

## Backend
The backend-server is built up of the following:
- **MongoDB Database**
- **GraphQL**
- **Express.js**
- **Apollo Server**

The group chose to use Express and Apollo Server to create a the server. The server is connected to a MongoDB database, which is hosted on a NTNU Virtual Machine. The database contains a collection of products, which is used to perform searches and retrieve information about the products. It also contains a table to store users, and another to store ratings. The server is hosted on a NTNU Virtual Machine, and is connected to the client through a proxy. The server is hosted on port 4000, and the client is hosted on port 5173.

The reason for using Express is that it is a lightweight framework, which is easy to use and has a lot of documentation. It is also easy to set up a server using Express. Apollo Server is a GraphQL server, which is used to perform queries and mutations to the database. The reason for using GraphQL is that it is easy to perform queries and mutations to the database, and it is easy to set up a GraphQL server using Apollo Server. MongoDB is a NoSQL database, which is easy to use and has a lot of documentation. This, along with its high speed, are the reasons why we chose to use MongoDB.

The database is filled with approximately 5000 products. These are scraped from the Kassalapp-API, which is a Norwegian API that contains information about grocery products. Using a python-script, items were fetched one by one from the API, checked by a filter, and posted to our database. The filter required its category to be included in one of nine categories, have a price, name, description etc. The needed size was set to 5000 items, as we felt it was sufficiently large to test the application, while still being small enough to not take too long to fetch.

Searching, filtering and ordering is handled by the backend-server. This functionality is set up in the resolvers. Here, it uses optimzed MongoDB-queries to effectively search the database. There are set up many variations of a query, in order to give the frontend flexibility. An example is the ability to collect all items that matches a query, or include a limitation into how many is needed. This is used later to create pagination of products.

### Sustainability

In order for the application to run in a sustainable manner, several actions were made to limit the amount of queries to the database. 
<br><br>
When writing in a search in the searchbar, it waits a second before it fetches suggestions. This is to let the user type the whole query before fetching, instead of fetching each time it types or removes a character. This has little effect on the user experience, but greatly reduces the amounts of queries. <br><br>
In the results-page, where the user is presented with a collection of products fitting its filters, it is implemented a pagianted presentation. It is presented with 16 products, and to view more, will have to swap page at the bottom. This is a normal way to limit the amount of traffic from the database, as it now only fetches 16 items. As a minor additon, it is implemented lazy loading of images. This has a greater effect on mobile-viewing, as less items are viewable at the same time.
<br><br>
When adding a rating, the user might change its rating, or wanting to remove it. In order to tackle the potentially significant amount of mutations this would cause, the application waits 2 seconds before it calls on the database to add, change or delete a rating. This does not affect the user experience at all, but reduces the amount of calls to the database.

### Hierarchy of the database

The database consists of 3 collections: Products, Ratings and Users. The Products collection contains all the products in the database. Here, all relevant information about each product is stored. The Ratings collection contains all the ratings in the database. Here, the ProductID (not the ObjectID of a product) is stored to refer to a Product, as well as a number to represent the value of the rating. The Users collection contains all the users in the database. It does not contain username and password, but instead a user is identified by its UUID (Unique User ID). This is also stored as a Localstorage-cookie in the browser, and if the user does not have one stored, it generates a new one and posts it as a new user in the database. A user stores directly an array of its favorites and the ratings it has given. A favorite is a direct referal to a Product, while a rating is a direct referal to a Rating.


## Frontend

### Use of the website

When opening the landing page, the user is presented with "Todays product", and 9 possible categories. When pressing one of these, the user is redirected to the results-page, where it is presented with a collection of products fitting the category. Here, the user can search for a product, filter by one or more categories, include a price range, and order the presented items by price. When the user adds a category it acts as union, rather than a intersection. This means that when a user checks both "Dessert" and "Middag", the backend retrieves items from both those categories at the same time. The user can also click on a product to view more information about it. Here, the user can rate the product, favorite it, and view other users' ratings. The user can also click on the "Home"-button to return to the landing page, or click on the "Favorites"-button to view its favorites.

### Components

TODO, when components are finalized


### Universal design
The website is designed in a way to tackle the possible variants of screen-sizes. For PC, box-like elements a placed in a grid, expanding downwards, while for a phone, the elements a placed in a longer nx1 column. We have made sure everything is readable, with high contrast everywhere. Headers use the h-tags, and all pictures have an alt-tag, consisting of the name of the product. This ensures that machine reading is effective if necessary.


### Testing
TODO, when testing is created


## State management

For this project, we use Recoil for state management. This allows states to be accessable across all pages, making filtering and searching much easier to handle. The recoil-states ar set up in [atoms.tsx](client/src/store/atoms.tsx)