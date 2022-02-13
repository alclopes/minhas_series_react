import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const NewGender = () => {
	const [name, setName] = useState('');
	const [success, setSuccess] = useState(false);

	const onChange = (e) => {
		setName(e.target.value);
	};

	const save = () => {
		axios
			.post('/api/genres', {
				name,
			})
			.then((res) => {
				setSuccess(true);
			});
	};

	if (success) {
		return <Navigate to='/gender' />;
	}

	return (
		<div className='container'>
			<h1>Gender</h1>
			<form>
				<div className='form-group'>
					<label htmlFor='name'>Name</label>
					<input
						type='text'
						value={name}
						onChange={onChange}
						className='form-control'
						id='name'
						aria-describedby='nameGender'
						placeholder='Gender Name'
					/>
				</div>
				<button type='button' className='btn btn-primary' onClick={save}>
					Save
				</button>
			</form>
		</div>
	);
};

export default NewGender;
