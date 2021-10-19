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
															<i className='far fa-eye-slash'></i>
														) : (
															<i className='far fa-eye'></i>
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
