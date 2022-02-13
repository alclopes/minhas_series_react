import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Genders = () => {
	const [data, setData] = useState([]);
	useEffect(() => {
		axios.get('/api/genres').then((res) => {
			setData(res.data.data);
		});
	}, []);

	const deleteGender = (id) => {
		axios.delete('/api/genres/' + id).then((res) => {
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
						onClick={() => deleteGender(record.id)}
					>
						Remove
					</button>
					<Link to={'/genders/' + record.id} className='btn btn-warning'>
						Edit
					</Link>
				</td>
			</tr>
		);
	};

	if (data.length === 0) {
		return (
			<div className='container'>
				<h1>Genders</h1>
				<Link to='/genders/new' className='btn btn-primary'>
					New Gender
				</Link>
				<div className='alert alert-warning' role='alert'>
					Sorry, we don't have any genders registered.
				</div>
			</div>
		);
	}

	return (
		<div className='container'>
			<h1>Genders</h1>
			<div>
				<Link to='/genders/new' className='btn btn-primary'>
					New Gender
				</Link>
			</div>
			<table className='table table-dark'>
				<thead>
					<tr>
						<th scope='col'>ID</th>
						<th scope='col'>Name</th>
						<th scope='col'>Ações</th>
					</tr>
				</thead>
				<tbody>{data.map(renderRow)}</tbody>
			</table>
		</div>
	);
};

export default Genders;
