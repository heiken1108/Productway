import { useEffect } from 'react';

import { useMutation } from '@apollo/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

import Header from './Components/Header/Header.tsx';
import AllStores from './Pages/AllProducts/AllProducts';
import MyPage from './Pages/MyPage/MyPage.tsx';
import Productpage from './Pages/Productpage/Productpage.tsx';
import ResultsPage from './Pages/ResultsPage/ResultsPage.tsx';
import { ADD_USER } from './queries.ts';

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
					<Route path="/project2/" element={<AllStores />} />

					<Route path="/project2/myPage" element={<MyPage />} />
					<Route
						path="/project2/product/:id"
						element={<Productpage />}
					/>
					<Route path="/project2/results" element={<ResultsPage />} />
				</Routes>
			</RecoilRoot>
		</Router>
	);
}

export default App;
