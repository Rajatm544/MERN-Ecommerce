import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { logoutUser } from '../actions/userActions';
import { listProducts } from '../actions/productActions';

const Header = () => {
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const cart = useSelector((state) => state.cart);
	const { userInfo } = userLogin;
	const { cartItems } = cart;

	const [show, setShow] = useState(false);
	const [count, setCount] = useState(0);

	useEffect(() => {
		setCount(cartItems.reduce((acc, item) => acc + item.qty, 0));
	}, [cartItems]);

	const handleDropdown = (e) => {
		show ? setShow(false) : setShow(!show);
	};

	const handleLogout = () => {
		dispatch(logoutUser());
		dispatch(listProducts());
	};
	return (
		<header>
			<section
				style={{
					display: show ? 'block' : 'none',
					minWidth: '100%',
					height: '100%',
					position: 'absolute',
				}}
				onClick={() => setShow(false)}></section>
			<Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
				<Container style={{ maxWidth: '85%' }}>
					<LinkContainer to='/'>
						<Navbar.Brand>BRAND</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ms-auto'>
							<LinkContainer to='/cart'>
								<Nav.Link>
									{count ? (
										<div
											style={{
												position: 'absolute',
												height: '1.2em',
												width: '1.2em',
												border: 'none',
												margin: '0',
												padding: '0',
												background: 'red',
												borderRadius: '50%',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												color: 'white',
												marginTop: '-0.5em',
												marginLeft: '1.2em',
												fontSize: '0.7em',
												fontWeight: 'bold',
												outline: 'none',
											}}>
											{count}
										</div>
									) : (
										''
									)}
									<i
										style={{ fontSize: '1.2em' }}
										className='fas fa-shopping-cart'></i>{' '}
									Cart
								</Nav.Link>
							</LinkContainer>
							{userInfo ? (
								<NavDropdown
									title={userInfo.name}
									id={userInfo.id}
									show={show}
									onClick={handleDropdown}>
									<LinkContainer to='/profile'>
										<NavDropdown.Item>
											Profile
										</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={handleLogout}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to='/login' variant='primary'>
									<Nav.Link>
										<i
											style={{ fontSize: '1.2em' }}
											className='fas fa-user'></i>{' '}
										Sign In
									</Nav.Link>
								</LinkContainer>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
