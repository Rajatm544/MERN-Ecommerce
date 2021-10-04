import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
	return (
		<Spinner
			animation='border'
			role='status'
			variant='primary'
			style={{
				width: '5rem',
				height: '5rem',
				margin: '5em auto',
				display: 'block',
			}}>
			<span className='sr-only'>Loading...</span>
		</Spinner>
	);
};

export default Loader;
