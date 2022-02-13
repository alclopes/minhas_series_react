import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import Home from './elements/Home';
import Series from './elements/Series';
import Genders from './elements/Genders';
import Header from './elements/Header';
import NewGender from './elements/NewGender';
import EditGender from './elements/EditGender';
import NewSerie from './elements/NewSerie';
import InfoSerie from './elements/InfoSerie';

function App() {
	const [data, setData] = useState({});
	useEffect(() => {
		// set proxy in package.json
		axios.get('/api').then((res) => {
			setData(res.data);
		});
	}, []);

	return (
		<Router>
			<div className='container'>
				<Header />
				{/* <pre>{JSON.stringify(data)}</pre> */}
				<Routes>
					<Route exact path='/' element={<Home />} />
					<Route exact path='/genders' element={<Genders />} />
					<Route exact path='/genders/new' element={<NewGender />} />
					<Route exact path='/genders/:id' element={<EditGender />} />
					<Route exact path='/series' element={<Series />} />
					<Route exact path='/series/new' element={<NewSerie />} />
					<Route exact path='/series/:id' element={<InfoSerie />} />
				</Routes>
				<br />
				<pre className='container'>Font/API: {data.info}</pre>
			</div>
		</Router>
	);
}

export default App;
