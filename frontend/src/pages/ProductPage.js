/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	Row,
	Col,
	Card,
	Button,
	ListGroup,
	Form,
	FloatingLabel,
} from 'react-bootstrap';
import ImageMagnifier from '../components/ImageMagnifier'; // to magnify image on hover
import Rating from '../components/Rating';
import Meta from '../components/Meta';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
	listProductDetails,
	createProductReview,
} from '../actions/productActions';
import { listMyOrders } from '../actions/orderActions';
import { refreshLogin, getUserDetails } from '../actions/userActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import getDateString from '../utils/getDateString';
import '../styles/product-page.css';

const ProductPage = ({ history, match }) => {
	const [quantity, setQuantity] = useState(1);
	const [rating, setRating] = useState(0);
	const [review, setReview] = useState('');
	const [allReviews, setAllReviews] = useState([]);
	const [hasOrderedItem, setHasOrderedItem] = useState(false); // bool to check if the user has ordered this product
	const [showReviewForm, setShowReviewForm] = useState(false); // bool to decide whether to show the review form or not
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, product, error } = productDetails;

	const userDetails = useSelector((state) => state.userDetails);
	const { error: userLoginError } = userDetails;

	const productCreateReview = useSelector(
		(state) => state.productCreateReview
	);
	const {
		loading: loadingCreateReview,
		success: successCreateReview,
		error: errorCreateReview,
	} = productCreateReview;

	const orderListUser = useSelector((state) => state.orderListUser);
	const { orders } = orderListUser;

	// fetch user login info
	useEffect(() => {
		userInfo
			? userInfo.isSocialLogin
				? dispatch(getUserDetails(userInfo.id))
				: dispatch(getUserDetails('profile'))
			: dispatch(getUserDetails('profile'));
	}, [userInfo, dispatch]);

	// refresh the access tokens for accessing user details
	useEffect(() => {
		if (userLoginError && userInfo && !userInfo.isSocialLogin) {
			const user = JSON.parse(localStorage.getItem('userInfo'));
			user && dispatch(refreshLogin(user.email));
		}
	}, [userLoginError, dispatch, userInfo]);

	useEffect(() => {
		dispatch(listMyOrders());
	}, [dispatch]);

	// add a new review, and reset the stored product review in the redux store
	useEffect(() => {
		if (successCreateReview) {
			window.alert('Review Submitted!!');
			setRating(0);
			setReview('');
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
		}
		dispatch(listProductDetails(match.params.id));
	}, [match, dispatch, successCreateReview]);

	useEffect(() => {
		if (product && product.reviews && userInfo) {
			let flag = 0; // to check if this user has already reviewed this product
			for (let review of product.reviews) {
				if (review.user === userInfo.id) {
					flag = 1;
					break;
				}
			}
			flag ? setShowReviewForm(false) : setShowReviewForm(true);
		} else {
			setShowReviewForm(true);
		}
	}, [product, userInfo]);

	useEffect(() => {
		if (orders && orders.length) {
			let flag = 0; // to check is this user has ordered this item
			for (let obj of orders) {
				for (let ele of obj.orderItems) {
					if (ele.product.toString() === match.params.id) {
						flag = 1;
						break;
					}
				}
			}
			flag ? setHasOrderedItem(true) : setHasOrderedItem(false);
		} else {
			setHasOrderedItem(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [orders]);

	// arrange all reviews in reverse chronological order
	useEffect(() => {
		if (product && product.reviews) {
			const sortedArr = product.reviews.sort(
				(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
			);
			setAllReviews(sortedArr);
		}
	}, [product]);

	const handleAddToCart = (e) => {
		history.push(`/cart/${match.params.id}?qty=${quantity}`);
	};

	const handleReviewSubmit = (e) => {
		dispatch(
			createProductReview(match.params.id, {
				rating,
				review,
			})
		);
	};

	return (
		<>
			<Link className='btn btn-outline-primary my-2' to='/'>
				Go Back
			</Link>
			{product && (!product._id || product._id !== match.params.id) ? (
				<Loader />
			) : error ? (
				<Message dismissible variant='danger' duration={10}>
					{error}
				</Message>
			) : product ? (
				<>
					<Meta title={`${product.name}`} />
					<Row>
						<Col md={6}>
							<ImageMagnifier
								src={product.image}
								alt={product.name}
								title={product.name}
							/>
						</Col>
						<Col md={3}>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h3>{product.name}</h3>
								</ListGroup.Item>
								<ListGroup.Item>
									{product && product.rating && (
										<Rating
											value={product.rating}
											text={`${
												product.numReviews
											} Review${
												product.numReviews > 1
													? 's'
													: ''
											}`}
										/>
									)}
								</ListGroup.Item>
								<ListGroup.Item>
									<strong>Price: </strong>
									{product.price &&
										product.price.toLocaleString('en-IN', {
											maximumFractionDigits: 2,
											style: 'currency',
											currency: 'INR',
										})}
								</ListGroup.Item>
								<ListGroup.Item>
									<strong>Description:</strong>{' '}
									{product.description}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={3}>
							<Card>
								<ListGroup variant='flush'>
									<ListGroup.Item>
										<Row>
											<Col>
												<strong>Price: </strong>
											</Col>
											<Col>
												{product.price &&
													product.price.toLocaleString(
														'en-IN',
														{
															maximumFractionDigits: 2,
															style: 'currency',
															currency: 'INR',
														}
													)}
											</Col>
										</Row>
									</ListGroup.Item>
								</ListGroup>
								<ListGroup variant='flush'>
									<ListGroup.Item>
										<Row>
											<Col>
												<strong>Status: </strong>
											</Col>
											<Col>
												{product.countInStock > 0
													? 'In Stock'
													: 'Out of Stock'}
											</Col>
										</Row>
									</ListGroup.Item>
									{product.countInStock > 0 && (
										<ListGroup.Item>
											<Row>
												<Col>
													<strong>Qty:</strong>
												</Col>
												<Col>
													<Form.Control
														as='select'
														value={quantity}
														onChange={(e) =>
															setQuantity(
																e.target.value
															)
														}>
														{/* create as many options as the countInStock */}
														{[
															...Array(
																product.countInStock
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
											</Row>
										</ListGroup.Item>
									)}
									<ListGroup.Item>
										<Row>
											<Button
												onClick={handleAddToCart}
												type='button'
												className='btn-block btn-lg'
												disabled={
													product.countInStock <= 0
												}>
												Add To Cart
											</Button>
										</Row>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<h2 className='mt-3'>Reviews</h2>
							{(!product.reviews || !product.reviews.length) && (
								<Message variant='secondary'>
									No Reviews Yet
								</Message>
							)}
							<ListGroup variant='flush'>
								{/* {console.log(
									product.reviews.
								)} */}
								{allReviews.map((item) => {
									return (
										<ListGroup.Item key={item._id}>
											<div>
												<img
													src={item.avatar}
													alt={item.name}
													className='review-avatar'
												/>
												<strong>{item.name}</strong>
											</div>
											<Rating value={item.rating} />
											<p
												style={{
													margin: '0',
													fontSize: '1.1em',
												}}>
												{item.review}
											</p>
											<small
												style={{
													fontSize: '0.9em',
												}}>
												{getDateString(
													item.createdAt,
													false
												)}
											</small>
										</ListGroup.Item>
									);
								})}
								{hasOrderedItem && !showReviewForm && (
									<Message dismissible>
										You have already reviewed this product
									</Message>
								)}
								{hasOrderedItem && showReviewForm && (
									<>
										<h2>Write a Customer Review</h2>
										{errorCreateReview && (
											<Message
												dismissible
												variant='info'
												duration={10}>
												{errorCreateReview}
											</Message>
										)}
										{loadingCreateReview && <Loader />}
										<Form onSubmit={handleReviewSubmit}>
											<Form.Group controlId='rating'>
												<Form.Control
													as='select'
													value={rating}
													onChange={(e) =>
														setRating(
															e.target.value
														)
													}>
													<option default>
														Choose Rating
													</option>
													<option value='1'>
														1 - Bad
													</option>
													<option value='2'>
														2 - Poor
													</option>
													<option value='3'>
														3 - Fair
													</option>
													<option value='4'>
														4 - Good
													</option>
													<option value='5'>
														5 - Excellent
													</option>
												</Form.Control>
											</Form.Group>
											<Form.Group controlId='comment'>
												<FloatingLabel
													controlId='commenttext'
													label='Comment'
													className='my-3'>
													<Form.Control
														as='textarea'
														placeholder='Leave a comment here'
														row='3'
														onChange={(e) =>
															setReview(
																e.target.value
															)
														}
														value={review}
													/>
												</FloatingLabel>
											</Form.Group>
											<div className='d-grid'>
												<Button type='submit'>
													Submit Review
												</Button>
											</div>
										</Form>
									</>
								)}
							</ListGroup>
						</Col>
					</Row>
				</>
			) : (
				''
			)}
		</>
	);
};

export default ProductPage;
