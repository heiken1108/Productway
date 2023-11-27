import { render, RenderResult, screen } from '@testing-library/react';

import ErrorContainer from '../../components/Error/ErrorContainer';

describe('ErrorContainer test', () => {
	let errorcontainer: RenderResult;
	beforeEach(() => {
		errorcontainer = render(
			<>
				<ErrorContainer />
			</>,
		);
	});

	it('snapshottest errorcontainer', () => {
		expect(errorcontainer).toMatchSnapshot();
	});

	it('renders correctly', () => {
		expect(
			screen.getAllByText(/Noe gikk galt. Dataen kunne ikke lastes/i),
		).toBeTruthy();
	});
});
