import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, InputGroup, FloatingLabel } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { registerUser } from '../actions/userActions';

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
			<div
				style={{
					display: 'flex',
					flexFlow: 'row wrap',
					alignItems: 'center',
				}}>
				<h1
					style={{ cursor: 'pointer' }}
					onClick={() => history.push('/login')}>
					Sign In
				</h1>
				<h1
					style={{ marginLeft: '1em', cursor: 'pointer' }}
					onClick={() => history.push('/register')}>
					Sign Up
				</h1>
			</div>
			{message && (
				<Message variant='warning' duration={10}>
					{message}
				</Message>
			)}
			{error && (
				<Message variant='danger' duration={10}>
					{error}
				</Message>
			)}
			{loading ? (
				<Loader />
			) : (
				<Form onSubmit={handleSubmit} style={{ width: '33em' }}>
					<Form.Group controlId='name' className='mb-2'>
						{/* <Form.Label>Name</Form.Label> */}
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
						{/* <Form.Label>Email Address</Form.Label> */}
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
						<InputGroup style={{ width: '100%' }}>
							<FloatingLabel
								controlId='passwordinput'
								label='Password'
								className='mb-3'>
								<Form.Control
									size='lg'
									type={typePassword}
									placeholder='Enter your password'
									value={password}
									style={{
										borderRight: 'none',
										width: '205%',
									}}
									onChange={(e) =>
										setPassword(e.target.value)
									}></Form.Control>
							</FloatingLabel>
							<div className='input-group-append'>
								<InputGroup.Text
									onClick={showHidePassword}
									style={{
										paddingLeft: '1em',
										fontSize: '1rem',
										width: '17.5%',
										height: '78%',
										marginLeft: '15rem',
										background: 'transparent',
									}}>
									{typePassword === 'text' ? (
										<i className='far fa-eye-slash'></i>
									) : (
										<i className='far fa-eye'></i>
									)}
								</InputGroup.Text>
							</div>
						</InputGroup>
						{/* <Form.Label>Password</Form.Label> */}
						{/* <InputGroup>
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
						</InputGroup> */}
					</Form.Group>
					<Form.Group>
						<InputGroup style={{ width: '100%' }}>
							<FloatingLabel
								controlId='confirmpasswordinput'
								label='Confirm password'
								className='mb-3'>
								<Form.Control
									size='lg'
									type={typeConfirmPassword}
									placeholder='Confirm your password'
									value={confirmPassword}
									style={{
										borderRight: 'none',
										width: '205%',
									}}
									onChange={(e) =>
										setConfirmPassword(e.target.value)
									}></Form.Control>
							</FloatingLabel>
							<div className='input-group-append'>
								<InputGroup.Text
									onClick={showHideConfirmPassword}
									style={{
										paddingLeft: '1em',
										fontSize: '1rem',
										width: '17.5%',
										height: '78%',
										marginLeft: '15rem',
										background: 'transparent',
									}}>
									{typeConfirmPassword === 'text' ? (
										<i className='far fa-eye-slash'></i>
									) : (
										<i className='far fa-eye'></i>
									)}
								</InputGroup.Text>
							</div>
						</InputGroup>
						{/* <Form.Label>Confirm Password</Form.Label>
						<InputGroup className='mb-3'>
							<Form.Control
								size='lg'
								type={typeConfirmPassword}
								placeholder='Confirm password'
								value={confirmPassword}
								style={{ borderRight: 'none' }}
								onChange={(e) =>
									setConfirmPassword(e.target.value)
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
						</InputGroup> */}
					</Form.Group>
					<Button
						type='submit'
						className='ms-auto'
						style={{
							padding: '0.5em 1em',
							width: '8rem',
						}}>
						Register
					</Button>
				</Form>
			)}
			{/* <Row>
				<Col className='mt-1'>
					Have an Account?{' '}
					<Link
						to={
							redirect ? `/login?redirect=${redirect}` : '/login'
						}>
						Login
					</Link>
				</Col>
			</Row> */}
		</FormContainer>
	);
};

export default RegisterPage;
