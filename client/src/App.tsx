import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AllStores from './Pages/AllProducts/AllProducts';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoryPage from './Pages/CategoryPage/CategoryPage';

const queryClient = new QueryClient();

function App() {
	return (
		<Router>
			<QueryClientProvider client={queryClient}>
				<Routes>
					<Route path="/" element={<AllStores />} />
					<Route path="/category/:categoryName" element={<CategoryPage/>}/>
				</Routes>
			</QueryClientProvider>
		</Router>
	);
}

export default App;
