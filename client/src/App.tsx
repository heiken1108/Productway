import { useEffect } from 'react';

import { useMutation } from '@apollo/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

import Header from './components/Header/Header.tsx';
import { ADD_USER } from './graphql/queries.ts';
import AllProducts from './pages/AllProducts/AllProducts.tsx';
import MyPage from './pages/MyPage/MyPage.tsx';
import Productpage from './pages/Productpage/Productpage.tsx';
import ResultsPage from './pages/ResultsPage/ResultsPage.tsx';

function App() {
	const [mutateFunctionUser] = useMutation(ADD_USER);
	useEffect(() => {
		const userID = localStorage.getItem('userID');
		if (userID === null) {
			const newUserID = uuidv4();
			localStorage.setItem('userID', newUserID);
			mutateFunctionUser({
				variables: {
					userID: newUserID,
				},
			});
		}
	}, [mutateFunctionUser]);

	return (
		<Router>
			<RecoilRoot>
				<Header />
				<Routes>
					<Route path="/" element={<AllProducts />} />

					<Route path="/myPage" element={<MyPage />} />
					<Route path="/product/:id" element={<Productpage />} />
					<Route path="/results" element={<ResultsPage />} />
				</Routes>
			</RecoilRoot>
		</Router>
	);
}

export default App;
