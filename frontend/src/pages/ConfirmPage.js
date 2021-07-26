import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { confirmUser } from '../actions/userActions';

const ConfirmPage = ({ match, history }) => {
	const dispatch = useDispatch();
	const userConfirm = useSelector((state) => state.userConfirm);
	const { loading, error, isConfirmed } = userConfirm;

	useEffect(() => {
		dispatch(confirmUser(match.params.token));
	}, [dispatch, match]);

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
					<Link to='/login'>Login</Link>
				</Card.Body>
			</Card>
		);
	}
};

export default ConfirmPage;
