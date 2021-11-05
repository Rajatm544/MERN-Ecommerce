import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { logoutUser } from '../actions/userActions';
import { Route } from 'react-router-dom';
import SearchBox from './SearchBox';
import '../styles/header.css';

const Header = () => {
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const cart = useSelector((state) => state.cart);
	const { userInfo } = userLogin;
	const { cartItems } = cart;

	const [show1, setShow1] = useState(false); // to close dropdown when clicking anywhere outside
	const [show2, setShow2] = useState(false); // to close dropdown when clicking anywhere outside
	const [count, setCount] = useState(0);

	// update count when new cart changes
	useEffect(() => {
		setCount(cartItems.reduce((acc, item) => acc + item.qty, 0));
	}, [cartItems]);

	// close the second dropdown when it is open and user clicks anywhere else
	const handleDropdown2 = (e) => {
		if (show2) {
			setShow2(false);
		} else {
			setShow2(true);
			setShow1(false);
		}
	};

	// close the first dropdown when it is open and user clicks anywhere else
	const handleDropdown1 = (e) => {
		if (show1) {
			setShow1(false);
		} else {
			setShow1(true);
			setShow2(false);
		}
	};

	// dispatch action to logout user
	const handleLogout = () => {
		dispatch(logoutUser());
		window.location.href = '/';
	};

	// render different navbars for large and small screens without navbar toggle
	return (
		<header>
			{/* this section covers entire screen except the dropdown, to handle onclicks */}
			<section
				className='navbar-dropdown-cover'
				style={{
					display:
						window.innerHeight > 430 && (show1 || show2)
							? 'block'
							: 'none',
					minWidth: '100%',
					height: '100%',
					zIndex: '100',
					position: 'absolute',
				}}
				onClick={() => {
					setShow1(false);
					setShow2(false);
				}}
			/>

			{/* conditionally render different navbars for the mobile sreens */}
			<Navbar bg='primary' variant='dark' expand='lg'>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand>
							<img
								src='/images/kosells.png'
								className='nav-logo'
								alt='logo'
							/>
							Kosells
						</Navbar.Brand>
					</LinkContainer>

					{/* history is available only inside Route, so this is used */}
					{/* display searchbar inside navbar in large screens only */}
					<Route
						render={({ history }) => (
							<div className='d-none d-md-block'>
								<SearchBox history={history} />
							</div>
						)}
					/>

					<Nav
						className='ms-auto nav-mobile'
						style={
							userInfo
								? {
										justifyContent: 'space-between',
								  }
								: {
										justifyContent: 'space-evenly',
								  }
						}>
						{userInfo && userInfo.isAdmin && (
							<>
								{/* display this only on mobile screens */}
								<LinkContainer
									className='d-block d-md-none'
									to='/admin/userlist'>
									<Nav.Link>
										<i className='fas fa-users' />
									</Nav.Link>
								</LinkContainer>
								<LinkContainer
									className='d-block d-md-none'
									to='/admin/orderlist'>
									<Nav.Link>
										<i className='fas fa-user-shield' />
									</Nav.Link>
								</LinkContainer>
								<LinkContainer
									className='d-block d-md-none'
									to='/admin/productlist'>
									<Nav.Link>
										<i className='fas fa-shopping-bag' />
									</Nav.Link>
								</LinkContainer>
							</>
						)}
						<LinkContainer to='/cart'>
							<Nav.Link>
								{/* indicate cart size */}
								{count ? (
									<div className='nav-cart-size'>
										<span
											style={
												count > 10
													? { fontSize: '0.6em' }
													: { fontSize: '0.7em' }
											}>
											{count}
										</span>
									</div>
								) : (
									''
								)}
								<i className='fas fa-shopping-cart navbar-icons' />{' '}
								{!(userInfo && userInfo.isAdmin) ||
								window.innerWidth >= 430
									? 'Cart'
									: ''}
							</Nav.Link>
						</LinkContainer>
						{userInfo && userInfo.isAdmin && (
							// show this only on md screens and above
							<NavDropdown
								className='d-none d-md-block'
								title='Admin'
								id='adminMenu'
								show={show2}
								onClick={handleDropdown2}>
								<LinkContainer to='/admin/userlist'>
									<NavDropdown.Item>Users</NavDropdown.Item>
								</LinkContainer>
								<LinkContainer to='/admin/productlist'>
									<NavDropdown.Item>
										Products
									</NavDropdown.Item>
								</LinkContainer>
								<LinkContainer to='/admin/orderlist'>
									<NavDropdown.Item>Orders</NavDropdown.Item>
								</LinkContainer>
							</NavDropdown>
						)}

						{userInfo && (
							// show this only on mobile screens
							<Nav.Link
								className='d-block d-md-none'
								onClick={handleLogout}>
								<i className='fas fa-sign-out-alt navbar-icons' />{' '}
								{!(userInfo && userInfo.isAdmin) && 'Logout'}
							</Nav.Link>
						)}

						{userInfo ? (
							<div className='nav-avatar-container'>
								{/* show this container only on mobile screens */}
								<LinkContainer
									to='/profile'
									className='d-block d-md-none'>
									<Nav.Link>
										<img
											src={userInfo.avatar}
											className='nav-avatar'
											alt={userInfo.name}
										/>
									</Nav.Link>
								</LinkContainer>
								<img
									src={userInfo.avatar}
									className='nav-avatar d-none d-md-block'
									alt={userInfo.name}
								/>

								{/* show this dropdown only on large screens */}
								<NavDropdown
									className='d-none d-md-block'
									title={userInfo.name}
									id={userInfo.id}
									show={show1}
									onClick={handleDropdown1}>
									<LinkContainer to='/profile'>
										<NavDropdown.Item>
											Profile
										</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={handleLogout}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							</div>
						) : (
							<LinkContainer to='/login' variant='primary'>
								<Nav.Link>
									<i className='fas fa-user navbar-icons' />{' '}
									Sign In
								</Nav.Link>
							</LinkContainer>
						)}
					</Nav>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
