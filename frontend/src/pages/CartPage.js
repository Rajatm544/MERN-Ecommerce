import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	Row,
	Col,
	Image,
	ButtonGroup,
	ListGroup,
	Button,
	Card,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Meta from '../components/Meta';
import Message from '../components/Message';
import { refreshLogin, getUserDetails } from '../actions/userActions';
import { addItem, removeItem } from '../actions/cartActions';

const CartPage = ({ match, location, history }) => {
	const [totalItems, setTotalItems] = useState(0);
	const productID = match.params.id;
	const qty = location.search ? Number(location.search.split('=')[1]) : 1; // fetch from the query string
	const dispatch = useDispatch();

	// get cart, userInfo and userdetails from redux store
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDetails = useSelector((state) => state.userDetails);
	const { error } = userDetails;

	// get user details depending on what type of login it is, dispatch with correspnding argument
	useEffect(() => {
		userInfo
			? userInfo.isSocialLogin
				? dispatch(getUserDetails(userInfo.id))
				: dispatch(getUserDetails('profile'))
			: dispatch(getUserDetails('profile'));
	}, [userInfo, dispatch]);

	// store total items to local state
	useEffect(() => {
		if (cartItems) {
			setTotalItems(cartItems.reduce((acc, item) => acc + item.qty, 0));
		}
	}, [cartItems]);

	// if userdetails shows error, then use refresh token to get new access tokens
	useEffect(() => {
		if (error && userInfo && !userInfo.isSocialLogin) {
			const user = JSON.parse(localStorage.getItem('userInfo'));
			user && dispatch(refreshLogin(user.email));
		}
	}, [error, dispatch, userInfo]);

	// add item to cart
	useEffect(() => {
		if (productID) {
			dispatch(addItem(productID, qty));
		}
	}, [dispatch, productID, qty]);

	// remove item from cart
	const handleRemoveFromCart = (id) => {
		dispatch(removeItem(id));
	};

	// proceed to shipping address page, which is the next step in placing an order
	const handleCheckout = (e) => {
		history.push('/login?redirect=shipping');
	};

	return (
		<Row>
			<Meta title='My Cart | Kosells' />
			<Col md={8}>
				<h1>Shopping Cart.</h1>
				{!cartItems.length ? (
					<Message>
						Your Cart is empty. <Link to='/'>Go Back.</Link>{' '}
					</Message>
				) : (
					<ListGroup variant='flush'>
						{cartItems.map((item) => (
							<ListGroup.Item key={item.product}>
								<Row
									style={{
										display: 'flex',
										alignItems: 'center',
									}}>
									<Col md={2}>
										<Image
											className='product-image'
											src={item.image}
											alt={item.name}
											fluid
											rounded
										/>
									</Col>
									<Col md={4}>
										<Link to={`/product/${item.product}`}>
											{item.name}
										</Link>
									</Col>
									<Col
										md={3}
										className='d-none d-md-flex'
										style={{
											alignItems: 'center',
											justifyContent: 'space-evenly',
										}}>
										{item.price.toLocaleString('en-IN', {
											maximumFractionDigits: 2,
											style: 'currency',
											currency: 'INR',
										})}

										<div>
											<i
												style={{ fontSize: '0.7em' }}
												className='fas fa-times'
											/>{' '}
											{item.qty}
										</div>
									</Col>
									{/* display this col only for larger screens */}
									<Col
										md={3}
										className='d-none d-md-flex'
										style={{
											alignItems: 'center',
											justifyContent: 'space-between',
										}}>
										<ButtonGroup aria-label='Addtocart'>
											<Button
												style={{
													outline: 'none',
													borderRight:
														'1px solid white',
												}}
												disabled={
													item.qty >=
													item.countInStock
												}
												onClick={() => {
													dispatch(
														addItem(
															item.product,
															Number(item.qty + 1)
														)
													);
												}}
												variant='primary'>
												<i className='fas fa-plus' />
											</Button>
											<Button
												style={{
													outline: 'none',
													borderLeft:
														'1px solid white',
												}}
												variant='primary'
												disabled={item.qty === 1}
												onClick={() => {
													dispatch(
														addItem(
															item.product,
															Number(item.qty - 1)
														)
													);
												}}>
												<i className='fas fa-minus' />
											</Button>
										</ButtonGroup>
										<Button
											type='button'
											onClick={() =>
												handleRemoveFromCart(
													item.product
												)
											}>
											<i className='fas fa-trash' />
										</Button>
									</Col>
									{/* display this col only on mobile screens */}
									<Col
										className='d-flex d-md-none mt-2'
										style={{
											alignItems: 'center',
											justifyContent: 'space-between',
										}}>
										<div
											className='d-flex'
											style={{
												fontSize: '1.2em',
												width: '50%',
											}}>
											{item.price.toLocaleString(
												'en-IN',
												{
													maximumFractionDigits: 2,
													style: 'currency',
													currency: 'INR',
												}
											)}

											<div className='ms-1'>
												<i
													style={{
														fontSize: '0.7em',
													}}
													className='fas fa-times'
												/>{' '}
												{item.qty}
											</div>
										</div>

										<div
											className='d-flex'
											style={{
												alignItems: 'center',
												justifyContent: 'space-between',
												width: '50%',
											}}>
											<Button
												type='button'
												onClick={() =>
													handleRemoveFromCart(
														item.product
													)
												}>
												<i className='fas fa-trash' />
											</Button>
											<Button
												style={{
													outline: 'none',
													borderRight:
														'1px solid white',
												}}
												disabled={
													item.qty >=
													item.countInStock
												}
												onClick={() => {
													dispatch(
														addItem(
															item.product,
															Number(item.qty + 1)
														)
													);
												}}
												variant='primary'>
												<i className='fas fa-plus' />
											</Button>
											<Button
												style={{
													outline: 'none',
													borderLeft:
														'1px solid white',
												}}
												variant='primary'
												disabled={item.qty === 1}
												onClick={() => {
													dispatch(
														addItem(
															item.product,
															Number(item.qty - 1)
														)
													);
												}}>
												<i className='fas fa-minus' />
											</Button>
										</div>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4} className='mt-3'>
				<ListGroup>
					<Card variant='flush'>
						<ListGroup.Item>
							<h2 className='text-center'>
								Subtotal ({totalItems}) Item
								{totalItems > 1 && 's'}
							</h2>
							<strong>
								{cartItems
									.reduce(
										(acc, item) =>
											acc + item.qty * item.price,
										0
									)
									.toLocaleString('en-IN', {
										maximumFractionDigits: 2,
										style: 'currency',
										currency: 'INR',
									})}
							</strong>
						</ListGroup.Item>
						<ListGroup.Item>
							<div className='d-grid'>
								<Button
									type='button'
									size='lg'
									disabled={!cartItems.length}
									onClick={handleCheckout}>
									Proceed to checkout
								</Button>
							</div>
						</ListGroup.Item>
					</Card>
				</ListGroup>
			</Col>
		</Row>
	);
};

export default CartPage;
