import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { confirmUser } from '../actions/userActions';

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
			<Message variant='danger'>
				Verfication Failed. Please try to login again.
			</Message>
		);
	} else if (isConfirmed) {
		localStorage.setItem('fillEmailOnLoginPage', 'true');
		return (
			<Card style={{ border: 'none', margin: '0 auto' }}>
				<Card.Body>
					<Card.Title>Account Confirmed</Card.Title>
					<Card.Text>
						Your account has been successfully verified! Please
						login and start exploring the best deals on all your
						favorite products.
					</Card.Text>
					{/* <Link to='/login'>Login</Link> */}
				</Card.Body>
			</Card>
		);
	}
};

export default ConfirmPage;
