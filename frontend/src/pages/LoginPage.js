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
import '../styles/login-register.css';

const LoginPage = ({ location, history }) => {
	const [authFailedMsg, setAuthFailedMsg] = useState(''); // if user tried to login with different social account after registering with some other social account
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
		if (location.search.includes('login=failed')) {
			const errorCodeQuery = location.search.split('&')[1];
			const errorCode = errorCodeQuery.split('=')[1];
			switch (errorCode) {
				case '0':
					setAuthFailedMsg(
						'It looks like you had registered using a Google Account'
					);
					break;
				case '1':
					setAuthFailedMsg(
						'It looks like you had registered using a Github Account'
					);
					break;
				case '2':
					setAuthFailedMsg(
						'It looks like you had registered using a Twitter Account'
					);
					break;
				case '3':
					setAuthFailedMsg(
						'It looks like you had registered using a LinkedIn Account'
					);
					break;
				default:
					return;
			}
		}
	}, [location.search]);

	// if redirected to login page after refresh token expired, show a message
	useEffect(() => {
		const flag = localStorage.getItem('redirectLogin');
		if (flag && flag === 'true') {
			setShowRedirectMsg(true);
		} else {
			setShowRedirectMsg(false);
		}
	}, []);

	// if the passport social login is successful, get the user's data and store in redux store
	useEffect(() => {
		// check for url params
		if (window.location.search.includes('success')) {
			const queries = window.location.search.split('&');
			const isSuccess = queries[0].split('=')[1] === 'success';
			const id = queries[1].split('=')[1];

			// if successful login
			if (isSuccess) {
				// get user data and dispatch login success
				axios
					.post('/api/users/passport/data', {
						id,
					})
					.then(({ data }) => {
						const {
							id,
							email,
							name,
							isAdmin,
							isConfirmed,
							avatar,
						} = data;
						const userData = {
							id,
							email,
							name,
							isAdmin,
							isConfirmed,
							avatar,
							isSocialLogin: true,
						};

						// login user in frontend
						dispatch({
							type: USER_LOGIN_SUCCESS,
							payload: userData,
						});
						// update the local storage
						localStorage.setItem(
							'userInfo',
							JSON.stringify(userData)
						);

						// remove variable that was meant to promt email verification if it is a social login
						localStorage.removeItem('promptEmailVerfication');
						history.push('/shipping'); // move to shipping page by default
					});
			}
		}
	}, [dispatch, history, redirect]);

	useEffect(() => {
		// if redirected from confirmation page, fill email and let user fill the password field
		if (
			storedInfo &&
			storedInfo.email &&
			localStorage.getItem('fillEmailOnLoginPage') === 'true'
		) {
			localStorage.removeItem('fillEmailOnLoginPage');
			setEmail(storedInfo.email);
		}
	}, [storedInfo]);

	// to show/hide the password field content
	const showHide = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setType(type === 'password' ? 'text' : 'password');
	};

	// login user from email and password
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(loginUser(email, password));
	};

	// to send a mail for resetting password if forgotted
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
			localStorage.setItem('EcommerceUserName', data.name); // store the user name, so that we can use it in the profile page to ask them to confirm email
		}
	};

	// there are 2 sorts of forms to be shown, one when resetting password, and other when normal login
	if (!forgotPassword) {
		return (
			<>
				<FormContainer>
					{/* if passport login has failed because user logged in with differrent social account, shoe the error msg */}
					{authFailedMsg && (
						<Message variant='danger' dismissible>
							{authFailedMsg}
						</Message>
					)}
					<div className='form-inner-container'>
						<div className='form-heading'>
							<h1
								style={{
									background: 'ghostwhite',
									boxShadow:
										'0px 0px 9px 0px rgba(0, 0, 0, 0.2)',
									WebkitBoxShadow:
										'0px 0px 9px 0px rgba(0, 0, 0, 0.2)',
									MozBoxShadow:
										'0px 0px 9px 0px rgba(0, 0, 0, 0.2)',
								}}>
								Sign In
							</h1>
							<h1 onClick={() => history.push('/register')}>
								Sign Up
							</h1>
						</div>

						{error && (
							<Message dismissible variant='danger' duration={10}>
								{error}
							</Message>
						)}
						{/* the message when refresh token has expired */}
						{showRedirectMsg && (
							<Message dismissible variant='info' duration={10}>
								Your session has expired. Please login again.
							</Message>
						)}
						{loading ? (
							<Loader />
						) : (
							<>
								<Form onSubmit={handleSubmit}>
									<Form.Group controlId='email'>
										<FloatingLabel
											controlId='emailinput'
											label='Email address'
											className='mb-3'>
											<Form.Control
												required
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
										<InputGroup>
											<FloatingLabel
												controlId='passwordinput'
												label='Password'
												style={{
													display: 'flex',
													width: '100%',
												}}
												className='mb-3'>
												<Form.Control
													required
													size='lg'
													type={type}
													placeholder='Enter your password'
													value={password}
													style={{
														borderRight: 'none',
													}}
													onChange={(e) =>
														setPassword(
															e.target.value
														)
													}
												/>
												<div className='input-group-append'>
													<InputGroup.Text
														onClick={showHide}
														style={{
															fontSize: '1rem',
															height: '100%',
															marginLeft:
																'-0.5em',
															background:
																'transparent',
															borderLeft: 'none',
														}}>
														{type === 'text' ? (
															<i className='far fa-eye-slash' />
														) : (
															<i className='far fa-eye' />
														)}
													</InputGroup.Text>
												</div>
											</FloatingLabel>
										</InputGroup>
									</Form.Group>
									<Col
										style={{
											display: 'flex',
										}}>
										<Button
											type='button'
											variant='link'
											style={{
												marginTop: '-1em',
												padding: '0',
											}}
											onClick={() =>
												setForgotPassword(true)
											}>
											Forgot Password?
										</Button>
										<Button
											type='submit'
											className='ms-auto'
											style={{
												padding: '0.5em 1em',
												width: '8rem',
											}}>
											Login
										</Button>
									</Col>
								</Form>
								<SocialLoginOptions />
							</>
						)}
					</div>
				</FormContainer>
			</>
		);
	} else {
		return (
			<>
				<FormContainer>
					<div className='form-inner-container'>
						<div className='form-heading'>
							<h1
								style={{
									background: 'ghostwhite',
									boxShadow:
										'0px -1px 5px 0px rgba(0, 0, 0, 0.2)',
									WebkitBoxShadow:
										'0px -1px 5px 0px rgba(0, 0, 0, 0.2)',
									MozBoxShadow:
										'0px -1px 5px 0px rgba(0, 0, 0, 0.2)',
									cursor: 'default',
								}}>
								Reset Password
							</h1>
						</div>

						{showLoading ? (
							<Loader />
						) : emailSent ? (
							<Card>
								<Card.Body className='pl-0'>
									<Card.Title>Email Sent</Card.Title>
									<Card.Text>
										Please use the link sent to your email
										and reset your password right away!
									</Card.Text>
								</Card.Body>
							</Card>
						) : (
							<Form onSubmit={handleEmailSubmit}>
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
								<Col
									style={{
										display: 'flex',
									}}>
									<Button
										type='button'
										variant='link'
										className='remember-password'
										style={{
											marginTop: '-1em',
											padding: '0',
										}}
										onClick={() =>
											setForgotPassword(false)
										}>
										I remember my password
									</Button>
									<Button
										type='submit'
										className='ms-auto'
										style={{
											padding: '0.5em 1em',
											width: '8rem',
										}}>
										Submit
									</Button>
								</Col>
								<SocialLoginOptions />
							</Form>
						)}
					</div>
				</FormContainer>
			</>
		);
	}
};

export default LoginPage;
