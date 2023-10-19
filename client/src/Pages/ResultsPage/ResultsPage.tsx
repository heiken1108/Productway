import { IProduct } from '../../data/types';
import { GET_PRODUCT_BY_FILTERS } from '../../queries';
import { useQuery } from '@apollo/client';
import ProductCard from '../../Components/ProductCard/ProductCard';

export default function CategoryPage() {
	//const searchTerm = useRecoilValue(searchTermState);
	const searchTerm = 'Is';
	const category = 'Dessert';
	const minPrice = 20;
	const maxPrice = 40;
	const { loading, error, data } = useQuery(GET_PRODUCT_BY_FILTERS, {
		variables: {
			search: searchTerm,
			category: category,
			minPrice: minPrice,
			maxPrice: maxPrice,
		},
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	const products = data.getProductsByFilters;

	return (
		<>
			<h1 className="title">
				Siden for søk: {searchTerm}, kategori: {category}, minPrice:{' '}
				{minPrice}, maxPrice: {maxPrice}
			</h1>
			<div className="ProductsContainer">
				{products.map((product: IProduct) => {
					return <ProductCard item={product} />;
				})}
			</div>
		</>
	);
}
