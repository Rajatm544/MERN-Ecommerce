import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	Form,
	Button,
	InputGroup,
	FloatingLabel,
	Row,
	Col,
} from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { registerUser } from '../actions/userActions';
import '../styles/login-register.css';

const RegisterPage = ({ location, history }) => {
	const [typePassword, setTypePassword] = useState('password');
	const [typeConfirmPassword, setTypeConfirmPassword] = useState('password');

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);
	const dispatch = useDispatch();

	const redirect = location.search ? location.search.split('=')[1] : '';
	const userRegister = useSelector((state) => state.userRegister);
	const { loading, userInfo, error } = userRegister;

	useEffect(() => {
		if (userInfo) {
			localStorage.setItem('promptEmailVerfication', 'true');
			history.push(redirect);
		}
	}, [history, redirect, userInfo]);

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

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Passwords do not match. Please retry.');
		} else {
			dispatch(registerUser(name, email, password));
		}
	};

	return (
		<FormContainer>
			<div className='form-inner-container'>
				<div className='form-heading'>
					<h1 onClick={() => history.push('/login')}>Sign In</h1>
					<h1
						style={{
							background: 'ghostwhite',
							boxShadow: '0px 0px 9px 0px rgba(0, 0, 0, 0.2)',
							WebkitBoxShadow:
								'0px 0px 9px 0px rgba(0, 0, 0, 0.2)',
							MozBoxShadow: '0px 0px 9px 0px rgba(0, 0, 0, 0.2)',
						}}
						onClick={() => history.push('/register')}>
						Sign Up
					</h1>
				</div>
				{message && (
					<Message dismissible variant='warning' duration={10}>
						{message}
					</Message>
				)}
				{error && (
					<Message dismissible variant='danger' duration={10}>
						{error}
					</Message>
				)}
				{loading ? (
					<Loader />
				) : (
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId='name' className='mb-2'>
							<FloatingLabel
								controlId='nameinput'
								label='Name'
								className='mb-3'>
								<Form.Control
									size='lg'
									placeholder='Enter Name'
									type='text'
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</FloatingLabel>
						</Form.Group>
						<Form.Group controlId='email' className='my-2'>
							<FloatingLabel
								controlId='emailinput'
								label='Email Address'
								className='mb-3'>
								<Form.Control
									size='lg'
									placeholder='Enter Email Address'
									type='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
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
										size='lg'
										type={typePassword}
										placeholder='Enter your password'
										value={password}
										style={{
											borderRight: 'none',
										}}
										onChange={(e) =>
											setPassword(e.target.value)
										}
									/>
									<div className='input-group-append'>
										<InputGroup.Text
											onClick={showHidePassword}
											style={{
												fontSize: '1rem',
												height: '100%',
												marginLeft: '-0.5em',
												background: 'transparent',
												borderLeft: 'none',
											}}>
											{typePassword === 'text' ? (
												<i className='far fa-eye-slash' />
											) : (
												<i className='far fa-eye' />
											)}
										</InputGroup.Text>
									</div>
								</FloatingLabel>
							</InputGroup>
						</Form.Group>
						<Form.Group>
							<InputGroup>
								<FloatingLabel
									controlId='confirmpasswordinput'
									label='Confirm password'
									style={{ display: 'flex', width: '100%' }}
									className='mb-3'>
									<Form.Control
										size='lg'
										type={typeConfirmPassword}
										placeholder='Confirm your password'
										value={confirmPassword}
										style={{
											borderRight: 'none',
										}}
										onChange={(e) =>
											setConfirmPassword(e.target.value)
										}
									/>
									<div className='input-group-append'>
										<InputGroup.Text
											onClick={showHideConfirmPassword}
											style={{
												fontSize: '1rem',
												height: '100%',
												marginLeft: '-0.5em',
												background: 'transparent',
												borderLeft: 'none',
											}}>
											{typeConfirmPassword === 'text' ? (
												<i className='far fa-eye-slash' />
											) : (
												<i className='far fa-eye' />
											)}
										</InputGroup.Text>
									</div>
								</FloatingLabel>
							</InputGroup>
						</Form.Group>
						<Row>
							<Col
								style={{
									display: 'flex',
								}}>
								<Button
									type='submit'
									className='ms-auto'
									style={{
										padding: '0.5em 1em',
										width: '8rem',
									}}>
									Register
								</Button>
							</Col>
						</Row>
					</Form>
				)}
			</div>
		</FormContainer>
	);
};

export default RegisterPage;
