import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AllStores from './AllProducts';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const queryClient = new QueryClient();

function App() {
	return (
		<Router>
			<QueryClientProvider client={queryClient}>
				<Routes>
					<Route path="/" element={<AllStores />} />
				</Routes>
			</QueryClientProvider>
		</Router>
	);
}

export default App;
