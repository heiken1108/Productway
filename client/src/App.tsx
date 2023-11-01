import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Header from './Components/Header/Header.tsx';
import AllStores from './Pages/AllProducts/AllProducts';
import CategoryPage from './Pages/CategoryPage/CategoryPage';
import MyPage from './Pages/MyPage/MyPage.tsx';
import Productpage from './Pages/Productpage/Productpage.tsx';
import ResultsPage from './Pages/ResultsPage/ResultsPage.tsx';

function App() {
	return (
		<Router>
			<RecoilRoot>
				<Header />
				<Routes>
					<Route path="/" element={<AllStores />} />

					<Route path="/MyPage" element={<MyPage />} />
					<Route
						path="/category/:categoryName"
						element={<CategoryPage />}
					/>
					<Route path="/product/:id" element={<Productpage />} />
					<Route path="/results" element={<ResultsPage />} />
				</Routes>
			</RecoilRoot>
		</Router>
	);
}

export default App;
