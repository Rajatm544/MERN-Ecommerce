/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { confirmUser } from '../actions/userActions';
import Meta from '../components/Meta';

const ConfirmPage = ({ match, history }) => {
	const dispatch = useDispatch();
	const userConfirm = useSelector((state) => state.userConfirm);
	const { loading, error, isConfirmed } = userConfirm;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		if (userInfo) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
	}, []);

	useEffect(() => {
		dispatch(confirmUser(match.params.token, isLoggedIn));
		// else dispatch(confirmUser(match.params.token, true));
	}, [dispatch, match, isLoggedIn]);

	if (loading || (!isConfirmed && !error)) {
		return <Loader />;
	} else if (error) {
		setTimeout(() => {
			history.push('/login');
		}, 11000);
		return (
			<Message variant='danger' duration={10}>
				Verfication Failed. Please try to login again.
			</Message>
		);
	} else if (isConfirmed) {
		localStorage.setItem('fillEmailOnLoginPage', 'true');
		return (
			<Card style={{ border: 'none', margin: '0 auto' }}>
				<Meta title='Confirm Password' />;
				<Card.Body>
					<Card.Title>Account Confirmed</Card.Title>
					<Card.Text>
						{setIsLoggedIn
							? 'Your account has been successfully verified! Go on and shop for the best deals of the day!'
							: `Your account has been successfully verified! Please
						login and start exploring the best deals on all your
						favorite products.`}
					</Card.Text>
					{!setIsLoggedIn ? <Link to='/login'>Login</Link> : null}
				</Card.Body>
			</Card>
		);
	}
};

export default ConfirmPage;
