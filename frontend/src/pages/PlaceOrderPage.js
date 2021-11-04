import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CheckoutStatus from '../components/CheckoutStatus';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { createOrder } from '../actions/orderActions';
import { CART_RESET } from '../constants/cartConstants';
import { refreshLogin, getUserDetails } from '../actions/userActions';

const PlaceOrderPage = ({ history }) => {
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { cartItems, shippingAddress, paymentMethod } = cart;

	const orderCreate = useSelector((state) => state.orderCreate);
	const { order, loading, success, error } = orderCreate;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDetails = useSelector((state) => state.userDetails);
	const { error: userLoginError } = userDetails;

	// fetch the userinfo from reducx store
	useEffect(() => {
		userInfo
			? userInfo.isSocialLogin
				? dispatch(getUserDetails(userInfo.id))
				: dispatch(getUserDetails('profile'))
			: dispatch(getUserDetails('profile'));
	}, [userInfo, dispatch]);

	// refresh access token when user detail throws error
	useEffect(() => {
		if (userLoginError && userInfo && !userInfo.isSocialLogin) {
			const user = JSON.parse(localStorage.getItem('userInfo'));
			user && dispatch(refreshLogin(user.email));
		}
	}, [userLoginError, dispatch, userInfo]);

	useEffect(() => {
		if (success) {
			localStorage.removeItem('cartItems');
			dispatch({ type: CART_RESET, payload: shippingAddress }); // remove items from cart once paid, but keep the shipping address in store
			history.push(`/order/${order._id}`);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [success, history]);

	// All prices, tax is randomly  assigned
	cart.itemsPrice = cartItems.reduce(
		(acc, item) => acc + item.price * item.qty,
		0
	);

	cart.shippingPrice = cart.itemsPrice > 8000 ? 500 : 300;
	cart.taxPrice = 0.18 * cart.itemsPrice;
	cart.totalPrice = cart.itemsPrice + cart.taxPrice + cart.shippingPrice;

	const handleOrder = (e) => {
		e.preventDefault();
		dispatch(
			createOrder({
				orderItems: cartItems,
				shippingAddress,
				paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			})
		);
	};

	return (
		<>
			{/* last step in the ckecout process */}
			<CheckoutStatus step1 step2 step3 step4 />
			<Row>
				{loading ? (
					<Loader />
				) : (
					<>
						<Col md={8}>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h2>Shipping</h2>
									<p>
										<strong>Address: </strong>{' '}
										{shippingAddress.address},{' '}
										{shippingAddress.city}-
										{shippingAddress.postalCode},{' '}
										{shippingAddress.country}
									</p>
								</ListGroup.Item>
								<ListGroup.Item>
									<h2>Payment Method</h2>
									<p>
										<strong>Method: </strong>{' '}
										{paymentMethod}
									</p>
								</ListGroup.Item>
								<ListGroup.Item>
									<h2>Cart Items</h2>
									{cartItems.length !== 0 ? (
										<ListGroup variant='flush'>
											{cartItems.map((item, idx) => (
												<ListGroup.Item key={idx}>
													<Row>
														<Col md={2}>
															<Image
																className='product-image'
																src={item.image}
																alt={item.name}
																fluid
																rounded
															/>
														</Col>
														<Col>
															<Link
																to={`/product/${item.product}`}>
																{item.name}
															</Link>
														</Col>
														<Col md={4}>
															{item.qty} x{' '}
															{item.price} ={' '}
															{(
																item.qty *
																item.price
															).toLocaleString(
																'en-IN',
																{
																	maximumFractionDigits: 2,
																	style: 'currency',
																	currency:
																		'INR',
																}
															)}
														</Col>
													</Row>
												</ListGroup.Item>
											))}
										</ListGroup>
									) : (
										<Message>Your cart is empty</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={4}>
							<Card>
								<ListGroup variant='flush'>
									<ListGroup.Item className='text-center'>
										<h2 className='text-center'>
											Order Summary
										</h2>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>
												<strong>Subtotal</strong>
											</Col>
											<Col>
												{Number(
													cart.itemsPrice
												).toLocaleString('en-IN', {
													maximumFractionDigits: 2,
													style: 'currency',
													currency: 'INR',
												})}
											</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>
												<strong>Shipping</strong>
											</Col>
											<Col>
												{Number(
													cart.shippingPrice
												).toLocaleString('en-IN', {
													maximumFractionDigits: 2,
													style: 'currency',
													currency: 'INR',
												})}
											</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>
												<strong>Tax</strong>
											</Col>
											<Col>
												{Number(
													cart.taxPrice
												).toLocaleString('en-IN', {
													maximumFractionDigits: 2,
													style: 'currency',
													currency: 'INR',
												})}
											</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>
												<strong>Total</strong>
											</Col>
											<Col>
												{Number(
													cart.totalPrice
												).toLocaleString('en-IN', {
													maximumFractionDigits: 2,
													style: 'currency',
													currency: 'INR',
												})}
											</Col>
										</Row>
									</ListGroup.Item>
									{error && (
										<ListGroup.Item>
											<Message
												dismissible
												variant='danger'
												duration={10}>
												{error}
											</Message>
										</ListGroup.Item>
									)}
									<ListGroup.Item className='d-grid gap-2'>
										<Button
											type='button'
											size='lg'
											disabled={!cartItems.length}
											onClick={handleOrder}>
											Place Order
										</Button>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</>
				)}
			</Row>
		</>
	);
};

export default PlaceOrderPage;
