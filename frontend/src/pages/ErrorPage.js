import React from 'react';
import errorImg from '../assets/404Error.png';
import { Link } from 'react-router-dom';
import '../styles/error-page.css';

// 404 page
const ErrorPage = () => {
	return (
		<div className='text-center'>
			<img className='error-img' alt='error' src={errorImg} />
			<p className='mb-0 mt-3 text-error'>
				<i className='far fa-frown' /> Looks like this page does not
				exist.
			</p>
			<p className='mt-0 text-error'>
				Go Back to the <Link to='/'>Home Page</Link>
			</p>
		</div>
	);
};

export default ErrorPage;
