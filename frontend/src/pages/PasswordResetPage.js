import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, InputGroup } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { resetUserPassword } from '../actions/userActions';

const PasswordResetPage = ({ match, history }) => {
	const [name, setName] = useState('');
	const [typePassword, setTypePassword] = useState('password');
	const [typeConfirmPassword, setTypeConfirmPassword] = useState('password');
	const [message, setMessage] = useState(null);
	const [confirmPassword, setConfirmPassword] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const userResetPassword = useSelector((state) => state.userResetPassword);
	const { loading, resetPassword, error } = userResetPassword;

	useEffect(() => {
		const nameFromLocalStorage = localStorage.getItem('EcommerceUserName');
		if (nameFromLocalStorage) {
			setName(nameFromLocalStorage);
		}
	}, []);

	useEffect(() => {
		if (resetPassword) {
			setTimeout(() => {
				history.push('/login');
			}, 10000);
		}
	}, [history, resetPassword]);

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
			dispatch(resetUserPassword(match.params.token, password));
		}
	};

	return (
		<FormContainer>
			<h1>{name ? `${name}, reset password` : 'Reset Password'}</h1>
			{message && (
				<Message duration={8} variant='warning'>
					{message}
				</Message>
			)}
			{resetPassword && (
				<Message variant='success' duration={8}>
					Password Changed Successfully.
				</Message>
			)}
			{error && <Message variant='danger'>{error}</Message>}
			{loading ? (
				<Loader />
			) : (
				<Form onSubmit={handleSubmit}>
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
						</InputGroup>
					</Form.Group>
					<Button type='submit' className='my-1'>
						Submit
					</Button>
				</Form>
			)}
		</FormContainer>
	);
};

export default PasswordResetPage;
