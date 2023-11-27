import { render, RenderResult, screen } from '@testing-library/react';
import jest from 'jest-mock';

import RatingComponent from '../../components/RatingComponent/RatingComponent';

describe('RatingComponent test', () => {
	let ratingComponent: RenderResult;
	let mockRatingChange: jest.Mock;

	beforeEach(() => {
		ratingComponent = render(
			<>
				<RatingComponent rating={5} onRatingChange={mockRatingChange} />
			</>,
		);
	});

	it('snapshottest errormessage', () => {
		expect(ratingComponent).toMatchSnapshot();
	});

	it('renders correctly', () => {
		const ratingShit = screen.getByLabelText('Very Satisfied');
		expect(ratingShit).toBeInTheDocument();
	});
});
