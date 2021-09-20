import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel, CarouselItem, Image } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { getTopRatedProducts } from '../actions/productActions';

const ProductCarousel = () => {
	const dispatch = useDispatch();

	const productTopRated = useSelector((state) => state.productTopRated);
	const { error, loading, products } = productTopRated;

	useEffect(() => {
		dispatch(getTopRatedProducts());
	}, [dispatch]);
	return (
		<>
			{loading && <Loader />}
			{error && <Message variant='danger'>{error}</Message>}
			<Carousel pause='hover' className='bg-primary'>
				{products &&
					products.map((product) => (
						<CarouselItem key={product._id}>
							<Link to={`/product/${product._id}`}>
								<Image
									src={product.image}
									alt={product.name}
									fluid
								/>
								<Carousel.Caption className='carousel-caption'>
									{product.name}(${product.price})
								</Carousel.Caption>
							</Link>
						</CarouselItem>
					))}
			</Carousel>
		</>
	);
};

export default ProductCarousel;
