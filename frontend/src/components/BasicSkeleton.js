import React from 'react';
import '../styles/skeleton.css';

const BasicSkeleton = ({ type }) => {
	const classes = `skeleton ${type}`;

	return <div className={classes} />;
};

export default BasicSkeleton;
