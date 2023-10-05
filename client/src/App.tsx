import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AllStores from './AllProducts';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AllStores />
		</QueryClientProvider>
	);
}

export default App;
