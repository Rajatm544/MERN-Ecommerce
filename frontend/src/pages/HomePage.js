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
import SearchBox from '../components/SearchBox';

const HomePage = ({ match, history }) => {
	const keyword = match.params.keyword; // to search for products
	const pageNumber = Number(match.params.pageNumber) || 1; // current page number in the paginated display
	const [allProducts, setAllProducts] = useState([]);
	const [promptVerfication, setPromptVerification] = useState(false); // prompt user to verify email if not yet confirmed
	const dispatch = useDispatch();

	// get the products list, userinfo and user details form the redix store
	const productList = useSelector((state) => state.productList);
	const { products, loading, error, pages } = productList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDetails = useSelector((state) => state.userDetails);
	const { error: userInfoError } = userDetails;

	// fetch the user details
	useEffect(() => {
		userInfo
			? userInfo.isSocialLogin
				? dispatch(getUserDetails(userInfo.id))
				: dispatch(getUserDetails('profile'))
			: dispatch(getUserDetails('profile'));
	}, [userInfo, dispatch]);

	// refresh token to get new access token if error in user details
	useEffect(() => {
		if (userInfoError && userInfo && !userInfo.isSocialLogin) {
			const user = JSON.parse(localStorage.getItem('userInfo'));
			dispatch(refreshLogin(user?.email));
		}
	}, [userInfoError, dispatch, userInfo]);

	// get products from store and put them into local state, to avoid blank screens
	useEffect(() => {
		if (products && products.length) {
			setAllProducts([...products]);
		}
	}, [products]);

	// list products based on keyword and pagenumber
	useEffect(() => {
		dispatch(listProducts(keyword, pageNumber));
	}, [dispatch, keyword, pageNumber]);

	// check if user needs to be promted about email verification on page load
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
			{/* display carousel only on larger screens */}
			{!keyword ? (
				window.innerWidth > 430 && <ProductCarousel />
			) : (
				<Link
					className='btn btn-outline btn-outline-primary my-2'
					to='/'>
					Go Back
				</Link>
			)}
			{/* display this search bar on home page on mobile screens */}
			<div className='d-block d-md-none'>
				<SearchBox history={history} />
			</div>

			{/* if the user needs to be prompted about email verification, show this message */}
			{promptVerfication ? (
				<Message dismissible variant='info' duration={10}>
					Account Created! Please check your email to verify your
					account and start shopping.
				</Message>
			) : null}
			{loading ? (
				<Loader />
			) : error ? (
				<Message dismissible variant='danger' duration={10}>
					{error}
				</Message>
			) : (
				products && (
					<>
						<Row>
							{allProducts.length
								? allProducts.map((product) => {
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
								: !products && (
										<Col className='text-center'>
											<div
												style={{
													fontSize: '1.5em',
												}}>
												<i className='far fa-frown' />{' '}
												No items found for this search
												query
											</div>
											Go Back to the{' '}
											<Link to='/'>Home Page</Link>
										</Col>
								  )}
						</Row>
						{/* paginate if more than 10 entries */}
						<Paginate
							className='mt-auto text-center'
							page={pageNumber}
							keyword={keyword ? keyword : ''}
							pages={pages}
						/>
					</>
				)
			)}
		</>
	);
};

export default HomePage;
