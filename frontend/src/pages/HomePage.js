import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product.js';
import { Row, Col } from 'react-bootstrap';
import { listProducts } from '../actions/productActions';

import Loader from '../components/Loader';
import Message from '../components/Message';

const HomePage = ({ match }) => {
	const keyword = match.params.keyword;
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { products, loading, error } = productList;
	const [promptVerfication, setPromptVerification] = useState(false);

	useEffect(() => {
		dispatch(listProducts(keyword));
	}, [dispatch, keyword]);

	useEffect(() => {
		setPromptVerification(
			localStorage.getItem('promptEmailVerfication') === 'true'
				? true
				: false
		);
	}, []);

	return (
		<>
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
			) : (
				''
			)}
		</>
	);
};

export default HomePage;
