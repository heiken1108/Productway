import { StrictMode } from 'react';

import { ApolloProvider } from '@apollo/client';
import { render, RenderResult, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import AddToFavourite from '../../Components/AddToFavourite/AddToFavourite';
import { client } from '../../graphql/apolloClient';

describe('Header test', () => {
	let addToFavourite: RenderResult;
	beforeEach(() => {
		addToFavourite = render(
			<StrictMode>
				<RecoilRoot>
					<ApolloProvider client={client}>
						<MemoryRouter>
							<AddToFavourite
								productID={1004}
								userID={'63dee3b6-163a-4368-8e1c-441f64082026'}
							/>
						</MemoryRouter>
					</ApolloProvider>
				</RecoilRoot>
			</StrictMode>,
		);
	});

	it('snapshottest addToFavourite', () => {
		expect(addToFavourite).toMatchSnapshot();
	});
	it('renders correctly', () => {
		const favoriteIcon = screen.getByTestId('favoriteIcon');
		expect(favoriteIcon).toBeInTheDocument();
	});
});
