import { StrictMode } from 'react';

import { ApolloProvider } from '@apollo/client';
import {
	fireEvent,
	render,
	RenderResult,
	screen,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Filterbar from '../../components/Filterbar/Filterbar';
import { client } from '../../graphql/apolloClient';

describe('Header test', () => {
	let filterbar: RenderResult;
	beforeEach(() => {
		filterbar = render(
			<StrictMode>
				<RecoilRoot>
					<ApolloProvider client={client}>
						<MemoryRouter>
							<Filterbar />
						</MemoryRouter>
					</ApolloProvider>
				</RecoilRoot>
			</StrictMode>,
		);
	});

	it('snapshottest filterbar', () => {
		expect(filterbar).toMatchSnapshot();
	});

	it('renders correctly', () => {
		expect(filterbar.getAllByText(/Kategori/i)).toBeTruthy();
		expect(filterbar.getAllByText(/Sortering/i)).toBeTruthy();
		expect(filterbar.getAllByText(/Minimal pris/i)).toBeTruthy();
		expect(filterbar.getAllByText(/Maksimal pris/i)).toBeTruthy();

		expect(filterbar.getAllByText(/Snacks & Godteri/i)).toBeTruthy();
		expect(filterbar.getAllByText(/Personlige artikler/i)).toBeTruthy();
		expect(filterbar.getAllByText(/Kjøtt/i)).toBeTruthy();
		expect(filterbar.getAllByText(/Middag/i)).toBeTruthy();
		expect(filterbar.getAllByText(/Ost/i)).toBeTruthy();
		expect(filterbar.getAllByText(/Dessert/i)).toBeTruthy();
		expect(filterbar.getAllByText(/Pålegg & frokost/i)).toBeTruthy();
		expect(filterbar.getAllByText(/Middagstilbehør/i)).toBeTruthy();
		expect(filterbar.getAllByText(/Drikke/i)).toBeTruthy();

		expect(filterbar.getAllByText(/Stigende pris/i)).toBeTruthy();
		expect(filterbar.getAllByText(/Synkende pris/i)).toBeTruthy();
	});

	it('changes color when clicked', () => {
		const snacksAndCandyButton = screen.getByRole('button', {
			name: 'Snacks & godteri',
		});
		expect(snacksAndCandyButton).toHaveStyle(
			'background-color: rgba(0, 0, 0, 0.04); color: rgba(0, 0, 0, 0.87);',
		);
		fireEvent.click(snacksAndCandyButton);
		expect(snacksAndCandyButton).toHaveStyle(
			'background-color: rgb(40, 112, 148); color: rgb(255, 255, 255);',
		);
		fireEvent.click(snacksAndCandyButton);
		expect(snacksAndCandyButton).toHaveStyle(
			'background-color: rgba(0, 0, 0, 0.04); color: rgba(0, 0, 0, 0.87);',
		);
		fireEvent.click(snacksAndCandyButton);
	});

	it('toggles the showStatus property of a category chip when clicked', () => {
		const snacksAndCandyChip = screen.getByRole('button', {
			name: 'Snacks & godteri',
		});
		expect(snacksAndCandyChip).toHaveClass(
			'MuiButtonBase-root MuiChip-root MuiChip-filled MuiChip-sizeMedium MuiChip-colorDefault MuiChip-clickable MuiChip-clickableColorDefault MuiChip-filledDefault css-8m5rrr-MuiButtonBase-root-MuiChip-root',
		);
		fireEvent.click(snacksAndCandyChip);
		expect(snacksAndCandyChip).toHaveClass(
			'MuiButtonBase-root MuiChip-root MuiChip-outlined MuiChip-sizeMedium MuiChip-colorDefault MuiChip-clickable MuiChip-clickableColorDefault MuiChip-outlinedDefault css-1r3mz6a-MuiButtonBase-root-MuiChip-root',
		);
		fireEvent.click(snacksAndCandyChip);
		expect(snacksAndCandyChip).toHaveClass(
			'MuiButtonBase-root MuiChip-root MuiChip-filled MuiChip-sizeMedium MuiChip-colorDefault MuiChip-clickable MuiChip-clickableColorDefault MuiChip-filledDefault css-8m5rrr-MuiButtonBase-root-MuiChip-root',
		);
	});

	it('toggles the showStatus property of a sorting filter chip when clicked', () => {
		const ascendingPriceChip = screen.getByRole('button', {
			name: 'Stigende pris',
		});
		expect(ascendingPriceChip).toHaveClass('MuiChip-outlined');
		fireEvent.click(ascendingPriceChip);
		expect(ascendingPriceChip).toHaveClass('MuiChip-filled');
	});

	it('untoggles the showStatus property of a sorting filter when the other sorting filter is clicked', () => {
		const ascendingPriceChip = screen.getByRole('button', {
			name: 'Stigende pris',
		});
		const descendingPriceChip = screen.getByRole('button', {
			name: 'Synkende pris',
		});
		expect(ascendingPriceChip).toHaveClass(
			'MuiButtonBase-root MuiChip-root MuiChip-filled MuiChip-sizeMedium MuiChip-colorDefault MuiChip-clickable MuiChip-clickableColorDefault MuiChip-filledDefault css-8m5rrr-MuiButtonBase-root-MuiChip-root',
		);
		expect(descendingPriceChip).toHaveClass('MuiChip-outlined');
		fireEvent.click(ascendingPriceChip);
		expect(ascendingPriceChip).toHaveClass(
			'MuiButtonBase-root MuiChip-root MuiChip-outlined MuiChip-sizeMedium MuiChip-colorDefault MuiChip-clickable MuiChip-clickableColorDefault MuiChip-outlinedDefault css-1r3mz6a-MuiButtonBase-root-MuiChip-root',
		);
		expect(descendingPriceChip).toHaveClass('MuiChip-outlined');
		fireEvent.click(descendingPriceChip);
		expect(ascendingPriceChip).toHaveClass('MuiChip-outlined');
		expect(descendingPriceChip).toHaveClass('MuiChip-filled');
	});
});
