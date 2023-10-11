import { useParams } from 'react-router-dom';
import './CategoryPage.css';

export default function CategoryPage() {
	const { categoryName } = useParams();

	return (
		<div className="categoryContainer">
			<p className="title">
				{' '}
				Siden for <strong>{categoryName}</strong>
			</p>
		</div>
	);
}
