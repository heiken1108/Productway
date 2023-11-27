import './ErrorMessage.css';

/*
 * This component is used to display an error message when the API is down.
 */
export default function ErrorContainer() {
	return (
		<div className="ErrorPage">
			<div id="apiErrorMessage" className="errorMessage">
				<div className="errorIcon">❌</div>
				<div className="errorText">
					Noe gikk galt. Dataen kunne ikke lastes.
				</div>
			</div>
		</div>
	);
}
