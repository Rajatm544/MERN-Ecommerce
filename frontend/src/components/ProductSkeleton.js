import React from 'react';
import BasicSkeleton from './BasicSkeleton';
import SkeletonShimmer from './SkeletonShimmer';

const ProductSkeleton = () => {
	return (
		<div className='skeleton-product-wrapper'>
			<BasicSkeleton type='box' />
			<BasicSkeleton type='text' />
			<BasicSkeleton type='text' />
			<SkeletonShimmer />
		</div>
	);
};

export default ProductSkeleton;
