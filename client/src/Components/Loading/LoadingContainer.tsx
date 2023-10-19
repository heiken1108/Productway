import LoadingAnimation from './LoadingAnimation';
import './LoadingAnimation.css';

export default function LoadingContainer() {
	return (
		<div className="loadingContainer">
			<div className="lds-default2">
				<LoadingAnimation />
			</div>
		</div>
	);
}
