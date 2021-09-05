import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	Form,
	Button,
	Row,
	InputGroup,
	Col,
	Card,
	Table,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
	sendVerficationEmail,
	getUserDetails,
	updateUserProfile,
	refreshLogin,
} from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { USER_PROFILE_UPDATE_RESET } from '../constants/userConstants';

const RegisterPage = ({ location, history }) => {
	const [typePassword, setTypePassword] = useState('password');
	const [typeConfirmPassword, setTypeConfirmPassword] = useState('password');

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);
	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, user, error } = userDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userProfileUpdate = useSelector((state) => state.userProfileUpdate);
	const { success } = userProfileUpdate;

	const orderListUser = useSelector((state) => state.orderListUser);
	const {
		loading: loadingOrdersList,
		orders,
		error: errorOrdersList,
	} = orderListUser;

	const userSendEmailVerfication = useSelector(
		(state) => state.userSendEmailVerfication
	);
	const { emailSent, hasError } = userSendEmailVerfication;

	useEffect(() => {
		if (error) {
			const user = JSON.parse(localStorage.getItem('userInfo'));
			user && dispatch(refreshLogin(user.email));
		}
	}, [error, dispatch]);

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		} else {
			// if user is null, first fetch it and then set its details to the local state
			if (!user || !user.name || success) {
				dispatch({ type: USER_PROFILE_UPDATE_RESET });
				dispatch(listMyOrders());
				userInfo
					? userInfo.isSocialLogin
						? dispatch(getUserDetails(userInfo.id))
						: dispatch(getUserDetails('profile'))
					: dispatch(getUserDetails('profile'));
				if (success) {
					userInfo.isSocialLogin
						? dispatch(getUserDetails(userInfo.id))
						: dispatch(getUserDetails('profile'));
				}
			} else {
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, [history, userInfo, user, dispatch, success]);

	const showHidePassword = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setTypePassword(typePassword === 'password' ? 'text' : 'password');
	};
	const showHideConfirmPassword = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setTypeConfirmPassword(
			typeConfirmPassword === 'password' ? 'text' : 'password'
		);
	};

	const getDateString = (date) => {
		const options = {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		};
		const timeStr = new Date(date).toLocaleTimeString('en', {
			timeStyle: 'short',
			hour12: false,
			timeZone: 'IST',
		});
		return timeStr + ' ' + new Date(date).toLocaleDateString('en', options);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Passwords do not match. Please retry.');
		} else {
			dispatch(updateUserProfile({ id: user.id, name, email }));
		}
	};
	return (
		<Row className={userInfo && userInfo.isConfirmed ? 'mt-4' : 'mt-2'}>
			{userInfo && !userInfo.isConfirmed ? (
				<>
					{emailSent && (
						<Message variant='success'>
							A verification link has been sent your mail!
						</Message>
					)}
					{hasError && <Message variant='danger'>{hasError}</Message>}
					<Card style={{ margin: '0' }} className='mb-3'>
						<Card.Body className='ps-0 '>
							<Card.Title style={{ fontWeight: 'bold' }}>
								Account Not Verified
							</Card.Title>
							<Card.Text>
								{`${userInfo.name}, `} your account is not yet
								verfied. Please{' '}
								<Button
									variant='link'
									className='p-0'
									style={{
										fontSize: '0.9em',
										margin: '0 0 0.1em 0',
										focus: 'none',
									}}
									onClick={() =>
										dispatch(
											sendVerficationEmail(userInfo.email)
										)
									}>
									click here
								</Button>{' '}
								to send a verfication email.
							</Card.Text>
							{/* <Link to='/login'>Login</Link> */}
						</Card.Body>
					</Card>
				</>
			) : null}
			<Col
				md={3}
				style={
					userInfo && !userInfo.isConfirmed
						? { opacity: '0.5', pointerEvents: 'none' }
						: { opacity: '1', pointerEvents: '' }
				}>
				<h2>Update Profile</h2>

				{message && <Message variant='warning'>{message}</Message>}
				{error && error !== 'Not authorised. Token failed' && (
					<Message variant='danger'>{error}</Message>
				)}
				{success && (
					<Message variant='success'>Profile Updated!</Message>
				)}
				{loading ? (
					<Loader />
				) : (
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId='name' className='mb-2'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								size='lg'
								placeholder='Enter Name'
								type='text'
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</Form.Group>
						<Form.Group
							controlId='email'
							className='my-2'
							style={
								userInfo && userInfo.isSocialLogin
									? {
											pointerEvents: 'none',
											opacity: '0.8',
									  }
									: {}
							}>
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								size='lg'
								placeholder='Enter Email Address'
								type='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Form.Group>
						{userInfo && !userInfo.isSocialLogin && (
							<>
								<Form.Group className='my-2'>
									<Form.Label>Password</Form.Label>
									<InputGroup>
										<Form.Control
											size='lg'
											type={typePassword}
											placeholder='Enter your password'
											value={password}
											style={{ borderRight: 'none' }}
											onChange={(e) =>
												setPassword(e.target.value)
											}></Form.Control>
										<InputGroup.Text
											id='basic-addon2'
											onClick={showHidePassword}
											style={{
												background: 'transparent',
												borderLeft: 'none',
												padding: '0.5em 0.5em 0.5em 0',
											}}>
											{typePassword === 'text' ? (
												<i className='far fa-eye-slash'></i>
											) : (
												<i className='far fa-eye'></i>
											)}
										</InputGroup.Text>
									</InputGroup>
								</Form.Group>
								<Form.Group className='my-2'>
									<Form.Label>Confirm Password</Form.Label>
									<InputGroup className='mb-3'>
										<Form.Control
											size='lg'
											type={typeConfirmPassword}
											placeholder='Confirm password'
											value={confirmPassword}
											style={{ borderRight: 'none' }}
											onChange={(e) =>
												setConfirmPassword(
													e.target.value
												)
											}></Form.Control>
										<InputGroup.Text
											id='basic-addon2'
											onClick={showHideConfirmPassword}
											style={{
												background: 'transparent',
												borderLeft: 'none',
												padding: '0.5em 0.5em 0.5em 0',
											}}>
											{typeConfirmPassword === 'text' ? (
												<i className='far fa-eye-slash'></i>
											) : (
												<i className='far fa-eye'></i>
											)}
										</InputGroup.Text>
									</InputGroup>
								</Form.Group>
							</>
						)}

						<Button type='submit' variant='dark' className='my-1'>
							Update Profile
						</Button>
					</Form>
				)}
			</Col>
			<Col
				md={9}
				style={
					userInfo && !userInfo.isConfirmed
						? {
								opacity: '0.5',
								pointerEvents: 'none',
						  }
						: {
								opacity: '1',
								pointerEvents: '',
						  }
				}>
				<h2>My Orders</h2>
				{loadingOrdersList ? (
					<Loader />
				) : errorOrdersList ? (
					<Message variant='danger'>{errorOrdersList}</Message>
				) : (
					<Table striped bordered responsive className='table-sm'>
						<thead className='text-center'>
							<th>ID</th>
							<th>Date</th>
							<th>Total</th>
							<th>Paid</th>
							<th>Delivered</th>
							<th></th>
						</thead>
						<tbody>
							{orders.map((order, idx) => (
								<tr
									key={idx}
									style={{
										textAlign: 'center',
										padding: '0',
									}}>
									<td>{order._id}</td>
									<td>{getDateString(order.createdAt)}</td>
									<td>{order.totalPrice}</td>
									<td>
										{order.isPaid ? (
											getDateString(order.paidAt)
										) : (
											<i
												className='fas fa-times'
												style={{
													color: 'red',
												}}></i>
										)}
									</td>
									<td>
										{order.isDelivered ? (
											getDateString(order.deliveredAt)
										) : (
											<i
												className='fas fa-times'
												style={{
													color: 'red',
												}}></i>
										)}
									</td>
									<td>
										<LinkContainer
											to={`/order/${order._id}`}>
											<Button
												variant='link'
												className='btn-sm'
												style={{ margin: '0' }}>
												Details
											</Button>
										</LinkContainer>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Col>
		</Row>
	);
};

export default RegisterPage;
