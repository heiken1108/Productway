import { StrictMode } from 'react';

import { ApolloProvider } from '@apollo/client';
import { render, RenderResult, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Header from '../../components/Header/Header';
import { client } from '../../graphql/apolloClient';

describe('Header test', () => {
	let header: RenderResult;
	beforeEach(() => {
		header = render(
			<StrictMode>
				<RecoilRoot>
					<ApolloProvider client={client}>
						<MemoryRouter>
							<Header />
						</MemoryRouter>
					</ApolloProvider>
				</RecoilRoot>
			</StrictMode>,
		);
	});

	it('snapshottest header', () => {
		expect(header).toMatchSnapshot();
	});

	it('renders correctly', () => {
		expect(screen.getAllByText(/Productway/i)).toBeTruthy();
		expect(screen.getAllByText(/Min side/i)).toBeTruthy();
		expect(
			screen.getAllByPlaceholderText(/Søk etter produkter.../i),
		).toBeTruthy();
	});
});
