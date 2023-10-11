import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './Searchbar.css';
import { IProduct } from '../../data/types';

export default function Searchbar({ products }: { products: IProduct[] }) {
	return (
		<div className="Searchbar">
			<Autocomplete
				disablePortal
				id="combo-box-demo"
				options={products}
				getOptionLabel={product => product.name}
				renderOption={(props, product) => (
					<li {...props} key={product.productID}>
						{product.name}
					</li>
				)}
				renderInput={params => (
					<TextField {...params} label="Products" />
				)}
				sx={{ width: 200 }}
			/>
		</div>
	);
}
