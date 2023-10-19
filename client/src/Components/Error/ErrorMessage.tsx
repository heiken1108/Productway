import './ErrorMessage.css';

export default function ErrorMessage() {
	return (
		//<div className="ErrorPage">
		<div id="apiErrorMessage" className="errorMessage">
			<div className="errorIcon">❌</div>
			<div className="errorText">
				Noe gikk galt. Dataen kunne ikke lastes.
			</div>
		</div>
		//</div>
	);
}
