import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { loginUser } from '../actions/userActions';

const LoginPage = ({ location, history }) => {
	const [type, setType] = useState('password');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const redirect = location.search ? location.search.split('=')[1] : '';
	const userLogin = useSelector((state) => state.userLogin);
	const { loading, userInfo, error } = userLogin;

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, redirect, userInfo]);

	const showHide = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setType(type === 'password' ? 'text' : 'password');
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(loginUser(email, password));
	};

	return (
		<FormContainer>
			<h1>Sign In.</h1>
			{error && <Message variant='danger'>{error}</Message>}
			{loading ? (
				<Loader />
			) : (
				<Form onSubmit={handleSubmit}>
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
					<Form.Group className='my-1'>
						<Form.Label>Password</Form.Label>
						<InputGroup className='mb-3'>
							<Form.Control
								size='lg'
								type={type}
								placeholder='Enter your password'
								value={password}
								style={{ borderRight: 'none' }}
								onChange={(e) =>
									setPassword(e.target.value)
								}></Form.Control>
							<InputGroup.Text
								id='basic-addon2'
								onClick={showHide}
								style={{
									background: 'transparent',
									borderLeft: 'none',
									padding: '0.5em 0.5em 0.5em 0',
								}}>
								{type === 'text' ? (
									<i className='far fa-eye-slash'></i>
								) : (
									<i className='far fa-eye'></i>
								)}
							</InputGroup.Text>
						</InputGroup>
					</Form.Group>
					<Button type='submit' variant='dark' className='my-1'>
						Login
					</Button>
					<Button type='button' variant='light' className='my-1 ml-2'>
						<Link
							to={
								redirect
									? `/register?redirect=${redirect}`
									: '/register'
							}>
							Register
						</Link>
					</Button>
				</Form>
			)}
			<Row></Row>
		</FormContainer>
	);
};

export default LoginPage;
