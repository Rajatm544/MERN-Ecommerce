import React from 'react';
import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name='description' content={description} />
			<meta name='keywords' content={keywords} />
		</Helmet>
	);
};

Meta.defaultProps = {
	title: 'Welcome to Kosells',
	keywords: 'Electronics, Kosells, Ecommerce, Rajat',
	description: 'Buy the best products at the lowest prices',
};
export default Meta;
