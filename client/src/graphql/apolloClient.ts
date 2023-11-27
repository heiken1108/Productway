import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
	uri: 'http://it2810-10.idi.ntnu.no:4000/graphql', // for production
	//uri: 'http://localhost:4000/graphql', // for local development
	credentials: 'include',
	cache: new InMemoryCache(),
});
