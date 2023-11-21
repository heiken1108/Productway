# Productway client

Within this directory, you'll find the frontend code for our project. The user interface is developed using React and TypeScript, powered by Vite as the build tool. The frontend interacts with the GraphQL API through Apollo Client for efficient data retrieval.

## Client structure

The frontend code resides within the `/src` folder and it organized into distinct sections:

-   `/assets`: Encompasses all assets utilized in the project.
-   `/components`: Houses all project components.
-   `/data`: Hosts Interfaces and hardcoded objects.
-   `/graphql`: Stores GraphQL queries and mutations for project use.
-   `/pages`: Contains all project pages.
-   `/store`: Hosts recoil atoms
-   `/test`: Includes unit tests for the project.

### Components

The project consists of following components:

-   `AddToFavourite`: Button component facilitating the addition or removal of a product from the user's favorites list.
-   `Error`: Utilized to present an error message when the project encounters difficulties establishing a connection to the API.
-   `FavoriteContainer`: Container designed for the display of favorite cards.
-   `Header`: Header component featuring the application name and an integrated search bar.
-   `Loading`: Loading animation displayed while awaiting an API response.
-   `MyPageButton`: Button providing a direct link to the user's personal page.
-   `ProductCard`: Card component responsible for presenting detailed information and images of the products.
-   `RatingComponent`: Component featuring 5 emojis with varying moods, employed for both product rating and the display of existing ratings.
-   `Searchbar`: A user-friendly search bar facilitating product searches within the database.
-   `TodaysItem`: Card component providing information about the selected product of the day.

## State management

For this project, we use Recoil for state management. This allows states to be accessable across all pages, making filtering and searching much easier to handle. The use of recoil also prevent 'prop-drilling'. You can find the recoil-states in [atoms.tsx](src/store/atoms.tsx)
