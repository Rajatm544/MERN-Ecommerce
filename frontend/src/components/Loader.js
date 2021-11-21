import React from 'react';
import { Spinner } from 'react-bootstrap';
import '../styles/loader.css';

const Loader = () => {
	return (
		<Spinner
			animation='border'
			role='status'
			variant='primary'
			className='loader'
		/>
	);
};

export default Loader;
