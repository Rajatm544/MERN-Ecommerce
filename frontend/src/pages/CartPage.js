import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	Row,
	Col,
	Image,
	Form,
	ListGroup,
	Button,
	Card,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { addItem } from '../actions/cartActions';

const CartPage = ({ match, location, history }) => {
	const productID = match.params.id;
	const qty = location.search ? Number(location.search.split('=')[1]) : 1;
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	useEffect(() => {
		if (productID) {
			dispatch(addItem(productID, qty));
		}
	}, [dispatch, productID, qty]);

	const handleRemoveFromCart = (id) => console.log(id);
	const handleCheckout = (e) => {
		history.push('/login?redirect=shipping');
	};

	return (
		<Row>
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
								<Row>
									<Col md={2}>
										<Image
											src={item.image}
											alt={item.name}
											fluid
											rounded
										/>
									</Col>
									<Col md={3}>
										<Link to={`/product/${item.product}`}>
											{item.name}
										</Link>
									</Col>
									<Col md={2}>$ {item.price}</Col>
									<Col md={3}>
										<Form.Control
											as='select'
											value={item.qty}
											onChange={(e) =>
												dispatch(
													addItem(
														item.product,
														Number(e.target.value)
													)
												)
											}>
											{/* create as many options as the countInStock */}
											{[
												...Array(
													item.countInStock
												).keys(),
											].map((ele) => (
												<option
													key={ele + 1}
													value={ele + 1}>
													{ele + 1}
												</option>
											))}
										</Form.Control>
									</Col>
									<Col md={2}>
										<Button
											type='button'
											variant='dark'
											onClick={() =>
												handleRemoveFromCart(
													item.product
												)
											}>
											<i className='fas fa-trash'></i>
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<ListGroup>
					<Card variant='flush'>
						<ListGroup.Item>
							<h2>
								Subtotal (
								{cartItems.reduce(
									(acc, item) => acc + item.qty,
									0
								)}
								) Items
							</h2>
							${' '}
							{cartItems
								.reduce(
									(acc, item) => acc + item.qty * item.price,
									2
								)
								.toFixed(2)}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								type='button'
								variant='dark'
								className='btn-block'
								disabled={!cartItems.length}
								onClick={handleCheckout}>
								Proceed to checkout
							</Button>
						</ListGroup.Item>
					</Card>
				</ListGroup>
			</Col>
			<Col md={2}></Col>
		</Row>
	);
};

export default CartPage;
