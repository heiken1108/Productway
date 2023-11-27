import { StrictMode } from 'react';

import { ApolloProvider } from '@apollo/client';
import { render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import ProductCard from '../../components/ProductCard/ProductCard';
import { client } from '../../graphql/apolloClient';

describe('Header test', () => {
	let productCard: RenderResult;
	beforeEach(() => {
		productCard = render(
			<StrictMode>
				<RecoilRoot>
					<ApolloProvider client={client}>
						<MemoryRouter>
							<ProductCard
								item={{
									productID: 1004,
									name: 'Byggryn Hele 550g boks Møllerens',
									brand: 'Møllerens',
									ean: '7020655411993',
									image: 'https://bilder.ngdata.no/7020655411993/kmh/large.jpg',
									store: 'Joker',
									currentPrice: 22.9,
								}}
							/>
						</MemoryRouter>
					</ApolloProvider>
				</RecoilRoot>
			</StrictMode>,
		);
	});

	it('snapshottest productCard', () => {
		expect(productCard).toMatchSnapshot();
	});

	it('renders correctly', () => {
		expect(
			productCard.getAllByText(/Byggryn Hele 550g boks Møllerens/i),
		).toBeTruthy();
		expect(productCard.getAllByText(/Møllerens/i)).toBeTruthy();
		expect(productCard.getAllByText(/Joker/i)).toBeTruthy();
	});
});
