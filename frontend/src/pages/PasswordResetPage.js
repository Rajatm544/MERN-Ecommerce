import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, InputGroup, FloatingLabel } from 'react-bootstrap';
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

	// get the name stored in the local storage and ask that user to reset password
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
				<Message dismissible duration={8} variant='warning'>
					{message}
				</Message>
			)}
			{resetPassword && (
				<Message dismissible variant='success' duration={8}>
					Password Changed Successfully.
				</Message>
			)}
			{error && (
				<Message dismissible variant='danger'>
					{error}
				</Message>
			)}
			{loading ? (
				<Loader />
			) : (
				<Form onSubmit={handleSubmit} style={{ width: '33em' }}>
					<Form.Group className='mb-2'>
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
									}
								/>
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
										<i className='far fa-eye-slash' />
									) : (
										<i className='far fa-eye' />
									)}
								</InputGroup.Text>
							</div>
						</InputGroup>
					</Form.Group>
					<Form.Group className='my-2'>
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
									}
								/>
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
										<i className='far fa-eye-slash' />
									) : (
										<i className='far fa-eye' />
									)}
								</InputGroup.Text>
							</div>
						</InputGroup>
					</Form.Group>
					<Button
						type='submit'
						style={{
							padding: '0.5em 1em',
							width: '8rem',
						}}>
						Submit
					</Button>
				</Form>
			)}
		</FormContainer>
	);
};

export default PasswordResetPage;
