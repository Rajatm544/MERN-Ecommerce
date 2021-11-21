import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel, CarouselItem, Image } from 'react-bootstrap';
import Message from './Message';
import { getTopRatedProducts } from '../actions/productActions';
import '../styles/product-carousel.css';
import CarouselSkeleton from '../components/CarouselSkeleton';

const ProductCarousel = () => {
	const dispatch = useDispatch();

	const productTopRated = useSelector((state) => state.productTopRated);
	const { error, loading, products } = productTopRated;

	useEffect(() => {
		dispatch(getTopRatedProducts());
	}, [dispatch]);
	return (
		<>
			{loading && <CarouselSkeleton />}
			{error && (
				<Message dismissible variant='danger'>
					{error}
				</Message>
			)}
			{/* render carousel only on large screens */}
			<Carousel
				style={{ marginTop: '0.5em' }}
				pause='hover'
				className='bg-primary'
				indicators={false}
				interval={10000}>
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
									{product.name} (
									{product.price.toLocaleString('en-IN', {
										maximumFractionDigits: 2,
										style: 'currency',
										currency: 'INR',
									})}
									)
								</Carousel.Caption>
							</Link>
						</CarouselItem>
					))}
			</Carousel>
		</>
	);
};

export default ProductCarousel;
