import React from 'react';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import './index.css';

const client = new ApolloClient({
	uri: 'http://it2810-10.idi.ntnu.no:4000/graphql', //Denne må endres når vi endrer til VM
	//uri: 'http://localhost:4000/graphql',
	credentials: 'include',
	cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>,
);
