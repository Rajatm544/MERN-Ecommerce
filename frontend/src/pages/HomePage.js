import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import Paginate from '../components/Paginate';
import { Row, Col } from 'react-bootstrap';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import { listProducts } from '../actions/productActions';
import { refreshLogin, getUserDetails } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomePage = ({ match }) => {
	const keyword = match.params.keyword;
	const pageNumber = Number(match.params.pageNumber) || 1;
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { products, loading, error, pages } = productList;
	const [promptVerfication, setPromptVerification] = useState(false);

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDetails = useSelector((state) => state.userDetails);
	const { error: userInfoError } = userDetails;

	useEffect(() => {
		userInfo
			? userInfo.isSocialLogin
				? dispatch(getUserDetails(userInfo.id))
				: dispatch(getUserDetails('profile'))
			: dispatch(getUserDetails('profile'));
	}, [userInfo, dispatch]);

	useEffect(() => {
		if (userInfoError && !userInfo.isSocialLogin) {
			const user = JSON.parse(localStorage.getItem('userInfo'));
			user && dispatch(refreshLogin(user.email));
		}
	}, [userInfoError, dispatch, userInfo]);

	useEffect(() => {
		dispatch(listProducts(keyword, pageNumber));
	}, [dispatch, keyword, pageNumber]);

	useEffect(() => {
		setPromptVerification(
			localStorage.getItem('promptEmailVerfication') === 'true'
				? true
				: false
		);
	}, []);

	return (
		<>
			<Meta />
			{!keyword ? (
				<ProductCarousel />
			) : (
				<Link
					className='btn btn-outline btn-outline-primary my-2'
					to='/'>
					Go Back
				</Link>
			)}
			<h1>Latest Products.</h1>
			{promptVerfication ? (
				<Message variant='info' duration={10}>
					Account Created! Please check your email to verify your
					account and start shopping.
				</Message>
			) : null}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger' duration={10}>
					{error}
				</Message>
			) : products ? (
				<>
					<Row>
						{products.length ? (
							products.map((product) => {
								return (
									<Col
										sm={12}
										md={6}
										lg={4}
										xl={3}
										key={product._id}>
										<Product product={product} />
									</Col>
								);
							})
						) : (
							<Col>No Items Found for this search query...</Col>
						)}
					</Row>
					<Paginate
						className='mt-auto text-center'
						page={pageNumber}
						keyword={keyword ? keyword : ''}
						pages={pages}
					/>
				</>
			) : (
				''
			)}
		</>
	);
};

export default HomePage;
