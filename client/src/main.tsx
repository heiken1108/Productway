import React from 'react';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import './index.css';

const client = new ApolloClient({
	uri: 'it2810-10.idi.ntnu.no:4000/project2', //Denne må endres når vi endrer til VM
	cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>,
);
