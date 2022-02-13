import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';

const EditSerie = () => {
	const params = useParams();
	const id = params.id;

	const [name, setName] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		axios.get('/api/series/' + id).then((res) => {
			setName(res.data.name);
		});
	}, [id]);

	const onChange = (e) => {
		setName(e.target.value);
	};

	const save = () => {
		axios
			.put('/api/series/' + id, {
				name,
			})
			.then((res) => {
				setSuccess(true);
			});
	};

	if (success) {
		return <Navigate to='/series' />;
	}

	return (
		<div className='container'>
			<h1>EditSerie</h1>
			<form>
				<div className='form-group'>
					<label htmlFor='name'>Name</label>
					<input
						type='text'
						value={name}
						onChange={onChange}
						className='form-control'
						id='name'
						aria-describedby='nameSerie'
						placeholder='Series Name'
					/>
				</div>
				<button type='button' className='btn btn-primary' onClick={save}>
					Save
				</button>
			</form>
		</div>
	);
};

export default EditSerie;
