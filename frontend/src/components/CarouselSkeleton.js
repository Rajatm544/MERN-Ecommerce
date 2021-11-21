import React from 'react';
import BasicSkeleton from './BasicSkeleton';
import SkeletonShimmer from './SkeletonShimmer';

const CarouselSkeleton = () => {
	return (
		<div style={{ position: 'relative', overflow: 'hidden' }}>
			<BasicSkeleton type='box' />
			<SkeletonShimmer />
		</div>
	);
};

export default CarouselSkeleton;
