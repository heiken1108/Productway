import './ErrorMessage.css';

export default function ErrorMessage() {
	return (
		//<div className="ErrorPage">
		<div id="apiErrorMessage" className="errorMessage">
			<div className="errorIcon">❌</div>
			<div
				className="errorText"
				aria-description="Noe gikk galt. Dataen kunne ikke lastes"
			>
				Noe gikk galt. Dataen kunne ikke lastes.
			</div>
		</div>
		//</div>
	);
}
