import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	Form,
	Button,
	InputGroup,
	Col,
	Card,
	FloatingLabel,
} from 'react-bootstrap';
import { loginUser } from '../actions/userActions';
import { USER_LOGIN_SUCCESS } from '../constants/userConstants';
import axios from 'axios';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import SocialLoginOptions from '../components/SocialLoginOptions';

const LoginPage = ({ location, history }) => {
	const [showRedirectMsg, setShowRedirectMsg] = useState(false);
	const [forgotPassword, setForgotPassword] = useState(false);
	const [showLoading, setShowLoading] = useState(false); // to display loader after user submits the email to reset password
	const [emailSent, setEmailSent] = useState(false); //to display a message that email is sent to reset password

	const [type, setType] = useState('password');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const redirect = location.search ? location.search.split('=')[1] : '';
	const userLogin = useSelector((state) => state.userLogin);
	const { loading, userInfo, error } = userLogin;
	const storedInfo = JSON.parse(localStorage.getItem('userInfo'));

	useEffect(() => {
		if (!location.search.includes('success') && userInfo)
			history.push(redirect);
	}, [history, redirect, location, userInfo]);

	useEffect(() => {
		const flag = localStorage.getItem('redirectLogin');
		if (flag && flag === 'true') {
			setShowRedirectMsg(true);
		} else {
			setShowRedirectMsg(false);
		}
	}, []);

	useEffect(() => {
		// check for url params
		if (window.location.search.includes('success')) {
			const queries = window.location.search.split('&');
			const isSuccess = queries[0].split('=')[1] === 'success';
			const id = queries[1].split('=')[1];
			if (isSuccess) {
				// get user data and dispatch login success
				axios
					.post('/api/users/passport/data', {
						id,
					})
					.then(({ data }) => {
						const { id, email, name, isAdmin, isConfirmed } = data;
						const userData = {
							id,
							email,
							name,
							isAdmin,
							isConfirmed,
							isSocialLogin: true,
						};
						dispatch({
							type: USER_LOGIN_SUCCESS,
							payload: userData,
						});
						localStorage.setItem(
							'userInfo',
							JSON.stringify(userData)
						);
						localStorage.removeItem('promptEmailVerfication');
						history.push('/shipping');
					});
			}
		}
	}, [dispatch, history, redirect]);

	useEffect(() => {
		if (
			storedInfo &&
			storedInfo.email &&
			localStorage.getItem('fillEmailOnLoginPage') === 'true'
		) {
			localStorage.removeItem('fillEmailOnLoginPage');
			setEmail(storedInfo.email);
		}
	}, [storedInfo]);

	const showHide = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setType(type === 'password' ? 'text' : 'password');
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(loginUser(email, password));
	};

	const handleEmailSubmit = async (e) => {
		e.preventDefault();
		setShowLoading(true);

		// send the mail to the registered user
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post(
			'/api/users/reset',
			{ email },
			config
		);

		if (data) {
			setShowLoading(false);
			setEmailSent(true);
			// store the name in localstorage
			localStorage.setItem('EcommerceUserName', data.name);
		}
	};

	if (!forgotPassword) {
		return (
			<>
				<FormContainer>
					<div
						style={{
							display: 'flex',
							flexFlow: 'row wrap',
							alignItems: 'center',
						}}>
						<h1>Sign In</h1>
						<h1
							style={{ marginLeft: '1em', cursor: 'pointer' }}
							onClick={() => history.push('/register')}>
							Sign Up
						</h1>
					</div>

					{error && (
						<Message variant='danger' duration={10}>
							{error}
						</Message>
					)}
					{showRedirectMsg && (
						<Message variant='info' duration={10}>
							Your session has expired. Please login again.
						</Message>
					)}
					{loading ? (
						<Loader />
					) : (
						<>
							<Form
								onSubmit={handleSubmit}
								style={{ width: '33em' }}>
								<Form.Group controlId='email'>
									<FloatingLabel
										controlId='emailinput'
										label='Email address'
										className='mb-3'>
										<Form.Control
											size='lg'
											placeholder='Enter Email Address'
											type='email'
											value={email}
											onChange={(e) =>
												setEmail(e.target.value)
											}
										/>
									</FloatingLabel>
								</Form.Group>
								<Form.Group>
									<InputGroup style={{ width: '100%' }}>
										<FloatingLabel
											controlId='passwordinput'
											label='Password'
											className='mb-3'>
											<Form.Control
												size='lg'
												type={type}
												placeholder='Enter your password'
												value={password}
												style={{
													borderRight: 'none',
													width: '205%',
												}}
												onChange={(e) =>
													setPassword(e.target.value)
												}
											/>
										</FloatingLabel>
										<div className='input-group-append'>
											<InputGroup.Text
												onClick={showHide}
												style={{
													paddingLeft: '1em',
													fontSize: '1rem',
													width: '17.5%',
													height: '78%',
													marginLeft: '15rem',
													background: 'transparent',
												}}>
												{type === 'text' ? (
													<i className='far fa-eye-slash'></i>
												) : (
													<i className='far fa-eye'></i>
												)}
											</InputGroup.Text>
										</div>
									</InputGroup>
								</Form.Group>
								<Col
									style={{
										display: 'flex',
									}}>
									<Button type='submit' className='my-1'>
										Login
									</Button>
									<Button
										type='button'
										variant='link'
										className='ms-auto'
										size='sm'
										onClick={() => setForgotPassword(true)}>
										Forgot Password?
									</Button>
								</Col>
							</Form>
							<SocialLoginOptions />
						</>
					)}
				</FormContainer>
			</>
		);
	} else {
		return (
			<>
				<FormContainer>
					<h1>Reset Password</h1>
					{showLoading ? (
						<Loader />
					) : emailSent ? (
						<Card>
							<Card.Body className='pl-0'>
								<Card.Title>Email Sent</Card.Title>
								<Card.Text>
									Please use the link sent to your email and
									reset your password right away!
								</Card.Text>
							</Card.Body>
						</Card>
					) : (
						<Form
							onSubmit={handleEmailSubmit}
							style={{ width: '33em' }}>
							<Form.Group controlId='email'>
								<Form.Label>Email Address</Form.Label>
								<Form.Control
									size='lg'
									placeholder='Enter Email Address'
									type='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</Form.Group>
							<Col
								style={{
									display: 'flex',
								}}>
								<Button
									type='submit'
									// variant='dark'
									className='mt-3'>
									Submit
								</Button>
								<Button
									type='button'
									variant='link'
									className='ms-auto'
									size='sm'
									onClick={() => setForgotPassword(false)}>
									{/* <Link to='/user/password/reset'> */}I
									remember my password
									{/* </Link> */}
								</Button>
							</Col>
						</Form>
					)}
					<SocialLoginOptions />
				</FormContainer>
			</>
		);
	}
};

export default LoginPage;
