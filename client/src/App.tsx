import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AllStores from './Pages/AllProducts/AllProducts';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoryPage from './Pages/CategoryPage/CategoryPage';
import Productpage from './Pages/Productpage/Productpage.tsx';
import Header from './Components/Header/Header.tsx';
import Shoppingcart from './Pages/Shoppingcart/Shoppingcart.tsx';

const queryClient = new QueryClient();

function App() {
	return (
		<Router>
			<QueryClientProvider client={queryClient}>
				<Header products={[]} />
				<Routes>
					<Route path="/" element={<AllStores />} />

					<Route path="/shoppingcart" element={<Shoppingcart />} />
					<Route
						path="/category/:categoryName"
						element={<CategoryPage />}
					/>
					<Route path="/product/:id" element={<Productpage />} />
				</Routes>
			</QueryClientProvider>
		</Router>
	);
}

export default App;
