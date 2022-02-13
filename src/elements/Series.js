// Componente que irá criar uma tabela listando os series de Series

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Series = () => {
	const [data, setData] = useState([]);
	useEffect(() => {
		axios.get('/api/series').then((res) => {
			setData(res.data.data);
		});
	}, []);

	const deleteSerie = (id) => {
		axios.delete('/api/series/' + id).then((res) => {
			const filtered = data.filter((item) => item.id !== id);
			setData(filtered);
		});
	};

	const renderRow = (record) => {
		return (
			<tr key={record.id}>
				<th scope='row'>{record.id}</th>
				<td>{record.name}</td>
				<td>
					<button
						className='btn btn-danger m-2'
						onClick={() => deleteSerie(record.id)}
					>
						Remove
					</button>
					<Link to={'/series/' + record.id} className='btn btn-warning'>
						Info
					</Link>
				</td>
			</tr>
		);
	};

	if (data.length === 0) {
		return (
			<div className='container'>
				<h1>Series</h1>
				<Link to='/series/new' className='btn btn-primary'>
					New Serie
				</Link>
				<div className='alert alert-warning' role='alert'>
					Sorry, we don't have any series registered.
				</div>
			</div>
		);
	}

	return (
		<div className='container'>
			<h1>Series</h1>
			<div>
				<Link to='/series/new' className='btn btn-primary'>
					New Serie
				</Link>
			</div>
			<table className='table table-dark'>
				<thead>
					<tr>
						<th scope='col'>ID</th>
						<th scope='col'>Nome</th>
						<th scope='col'>Ações</th>
					</tr>
				</thead>
				<tbody>{data.map(renderRow)}</tbody>
			</table>
		</div>
	);
};

export default Series;
