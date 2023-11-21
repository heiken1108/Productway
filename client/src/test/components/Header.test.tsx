import { StrictMode } from 'react';

import { ApolloProvider } from '@apollo/client';
import { render, RenderResult, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { client } from '../../apolloClient';
import Header from '../../Components/Header/Header';

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

	it('snapshottest seader', () => {
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
