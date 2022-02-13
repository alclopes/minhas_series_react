import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Badge } from 'reactstrap';

import { useParams, Navigate } from 'react-router-dom';

const InfoSerie = () => {
	const params = useParams();
	const id = params.id;

	const [form, setForm] = useState({ name: '' });
	const [success, setSuccess] = useState(false);
	const [mode, setMode] = useState('INFO');
	const [genres, setGenres] = useState([]);
	const [genreId, setGenreId] = useState('');

	const [data, setData] = useState({});
	useEffect(() => {
		console.log(1);
		axios.get('/api/series/' + id).then((res) => {
			setData(res.data);
			setForm(res.data);
		});
	}, [id]);

	useEffect(() => {
		console.log(2);
		axios.get('/api/genres/').then((res) => {
			setGenres(res.data.data);
			const genres = res.data.data;
			const encontrado = genres.find((value) => data.genre === value.name);
			if (encontrado) {
				setGenreId(encontrado.id);
			}
		});
	}, [data]);

	const masterHeader = {
		height: '50vh',
		minHeight: '500px',
		//BUG: backgroundImage: GET http://localhost:3000/series/undefined 404 (Not Found)
		backgroundImage: `url('${data.background}')`,
		backgroundSize: 'cover',
		backgrounPosition: 'center',
		backgrounRepeat: 'no-repeat',
	};

	//#func2Chamadas#
	const onChange = (field) => (evt) => {
		setForm({
			...form,
			[field]: evt.target.value,
		});
	};

	const onChangeGenre = (evt) => {
		setGenreId(evt.target.value);
	};

	const seleciona = (value) => () => {
		setForm({
			...form,
			status: value,
		});
	};

	const save = () => {
		axios
			.put('/api/series/' + id, {
				...form,
				genre_id: genreId,
			})
			.then((res) => {
				setSuccess(true);
			});
	};

	if (success) {
		return <Navigate to='/series' />;
	}

	return (
		<div>
			<header style={masterHeader}>
				{/* <pre>{JSON.stringify(data)}</pre> */}
				<div className='h-100' style={{ background: 'rgba(0,0,0,0.7)' }}>
					<div className='h-100 container'>
						<div className='row h-100 align-items-center'>
							<div className='col-3'>
								<img
									className='img-fluid img-thumbnail'
									alt={data.name}
									src={data.poster}
								/>
							</div>
							<div className='col-8'>
								<h1 className='font-weight-light text-white'>{data.name}</h1>
								<div className='lead text-white d-flex flex-row'>
									<div className='px-2'>
										{(data.status === 'ASSISTIDO' ||
											data.status === 'WATCHED') && (
											<Badge color='success'>Watched</Badge>
										)}
										{(data.status === 'PARA_ASSISTIR' ||
											data.status === 'TO WATCH') && (
											<Badge color='warning'>To watch</Badge>
										)}
									</div>
									<div className='px-2'> Gender: {data.genre}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
			{mode === 'INFO' && (
				<div className='container'>
					<button
						type='button'
						className='btn btn-primary'
						onClick={() => setMode('EDIT')}
					>
						Edit
					</button>
				</div>
			)}
			{mode === 'EDIT' && (
				<div className='container'>
					<h1>EditSerie</h1>
					<pre>{JSON.stringify(form)}</pre>
					<form>
						<div className='form-group'>
							<label htmlFor='name'>Name</label>
							<input
								type='text'
								value={form.name}
								onChange={onChange('name')}
								className='form-control'
								id='name'
								aria-describedby='nameSerie'
								placeholder='Series Name'
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='name'>Comentários</label>
							<input
								type='text'
								value={form.comments}
								onChange={onChange('comments')}
								className='form-control'
								id='comments'
								aria-describedby='nameSerie'
								placeholder='Series Name'
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='name'>Gender</label>
							<select
								className='form-control'
								onChange={onChangeGenre}
								value={genreId}
							>
								{genres.map((genre) => (
									<option key={genre.id} value={genre.id}>
										{genre.name}
									</option>
								))}
							</select>
						</div>
						<div className='form-check'>
							<input
								className='form-check-input'
								type='radio'
								checked={form.status === 'WATCHED'}
								name='status'
								id='watched'
								value='WATCHED'
								onChange={seleciona('WATCHED')}
							/>
							<label className='form-check-label' htmlfor='watched'>
								Watched
							</label>
						</div>
						<div className='form-check'>
							<input
								className='form-check-input'
								type='radio'
								checked={form.status === 'PARA_ASSISTIR'}
								name='status'
								id='paraAssistir'
								value='PARA_ASSISTIR'
								onChange={seleciona('PARA_ASSISTIR')}
							/>
							<label className='form-check-label' htmlfor='paraAssistir'>
								Para Assistir
							</label>
						</div>
						<button type='button' className='btn btn-primary' onClick={save}>
							Save
						</button>
						<button
							type='button'
							className='btn btn-secondary'
							onClick={() => setMode('INFO')}
						>
							Cancelar edição
						</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default InfoSerie;
