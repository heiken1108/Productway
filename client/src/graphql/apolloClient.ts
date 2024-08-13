import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
	//uri: 'http://it2810-10.idi.ntnu.no:4000/graphql', // for production
	uri: import.meta.env.VITE_APOLLO_CLIENT_URI, // for local development
	credentials: 'include',
	cache: new InMemoryCache(),
});
