import { render, RenderResult, screen } from '@testing-library/react';

import ErrorMessage from '../../Components/Error/ErrorMessage';

describe('ErrorMessage test', () => {
	let errormessage: RenderResult;
	beforeEach(() => {
		errormessage = render(
			<>
				<ErrorMessage />
			</>,
		);
	});

	it('snapshottest errormessage', () => {
		expect(errormessage).toMatchSnapshot();
	});

	it('renders correctly', () => {
		expect(
			screen.getAllByText(/Noe gikk galt. Dataen kunne ikke lastes/i),
		).toBeTruthy();
	});
});
