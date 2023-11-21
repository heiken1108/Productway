# [Productway](http://it2810-10.idi.ntnu.no/project2/)

The application allows a user to search for groceryproducts in order to look up information, such as price, rate the product or favorite it. It uses a pre-populated database of products and their information to present the information and perform searches. The user is able to search by name, filter by one or more categories, include a price range, and order the presented items by price

### Use of the website

When opening the landing page, the user is presented with "Todays product", and 9 possible categories. When pressing one of these, the user is redirected to the results-page, where it is presented with a collection of products fitting the category. Here, the user can search for a product, filter by one or more categories, include a price range, and order the presented items by price. When the user adds a category it acts as union, rather than a intersection. This means that when a user checks both "Dessert" and "Middag", the backend retrieves items from both those categories at the same time. The user can also click on a product to view more information about it. Here, the user can rate the product, favorite it, and view other users' ratings. The user can also click on the "Home"-button to return to the landing page, or click on the "Favorites"-button to view its favorites.

## Installation and running the project

1. Clone the repository and and navigate to the project directory

2. Navigate to the client-repository and start the client by running the following commands:

```
cd client
npm install
npm run dev
```

3. Open a browser and navigate to [http://localhost:5173/](http://localhost:5173/) to view the project

NB: The backend is hosted on a NTNU Virtual Machine at
[http://it2810-10.idi.ntnu.no:4000](http://it2810-10.idi.ntnu.no:4000)
In order for the connection to the backend to be working, the user must be connected to the NTNU network (either by being on campus or using VPN). If the user is not connected to the NTNU network, the user can still view the project, but the connection to the backend will not be working, deeming the application functionless.

## Server

You can find information about the server and database [here](server/readme.md)

## Client

You can find more information about the client [here](client/readme.md)

## Sustainability

In order for the application to run in a sustainable manner, several actions were made to limit the amount of queries to the database.
<br><br>
When writing in a search in the searchbar, it waits a second before it fetches suggestions. This is to let the user type the whole query before fetching, instead of fetching each time it types or removes a character. This has little effect on the user experience, but greatly reduces the amounts of queries. <br><br>
In the results-page, where the user is presented with a collection of products fitting its filters, it is implemented a pagianted presentation. It is presented with 12 products, and to view more, will have to swap page at the bottom. This is a normal way to limit the amount of traffic from the database, as it now only fetches 16 items. As a minor additon, it is implemented lazy loading of images. This has a greater effect on mobile-viewing, as less items are viewable at the same time.

## Universal design

The website is designed in a way to tackle the possible variants of screen-sizes. For PC, box-like elements a placed in a grid, expanding downwards, while for a phone, the elements a placed in a longer nx1 column. We have made sure everything is readable, with high contrast everywhere. Headers use the h-tags, and all pictures have an alt-tag, consisting of the name of the product. This ensures that machine reading is effective if necessary.

## Testing

The project consists of 3 different test types

#### Unit tests

We've conducted testing using Vitest and React Testing Library. The unit tests and snapshot tests guarantee accurate rendering and expected behavior of the components.
You can find the component tests [here](/client/src/test/)
To run the unit tests you follow the steps below:

```
cd client
npm install
npm run test
```

#### End-to-end tests

For end-to-end testing, we employed Playwright. These tests verify that the application behaves appropriately in response to user actions. The tests are written in a way that they can be run on any browser.

You can fin the e2e tests [here](/playwright/tests/)
To run the e2e tests you follow the steps below:

```
cd playwright
npm install
npx playwright install
npm run test
```

#### Resolver tests

The resolvers are tested using Vitest. These tests verify that the resolvers behave appropriately in response to user actions. The resolvers are tested by mocking the database and testing the resolvers against these mock database. This ensures that the resolvers behave as expected. To mock the database we use an in-memory database provided by mongo.

You can find the resolver tests [here](/server/resolvers/__tests__/)
To run the resolver tests you follow the steps below:

```
cd server
npm install
npm run test
```
