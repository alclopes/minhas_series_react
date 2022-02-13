// #loadingMsg#
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios.get('/api/genres').then((res) => {
			setData(res.data.data);
			setLoading(false);
		});
	}, []);

	const renderGenreLink = (record) => {
		return (
			<span key={record.id}>
				&nbsp; &nbsp;
				<Link to={'/series/' + record.id}>{record.name}</Link>
				&nbsp;
			</span>
		);
	};

	if (data.length === 0) {
		return (
			<div className='container'>
				<h1>Home</h1>
				<div className='alert alert-warning' role='alert'>
					Sorry, we don't have any movies registered.
				</div>
			</div>
		);
	}

	if (data.length !== 0) {
		return (
			<div>
				<section className='intro-section'>
					<div className='row'>
						<div className='col-lg-12'>
							<p>
								Never forget a series you watched or someone recommended you.
							</p>
						</div>
						{loading && <span> Please wait, loading... </span>}
						{!loading && (
							<div>
								Choose to view your series by genre:
								{data.map(renderGenreLink)}
							</div>
						)}
					</div>
				</section>
			</div>
		);
	}
};

export default Home;
