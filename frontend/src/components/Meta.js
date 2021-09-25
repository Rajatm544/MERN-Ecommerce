import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
	return (
		<HelmetProvider>
			<Helmet>
				<title>{title}</title>
				<meta name='description' content={description} />
				<meta name='keywords' content={keywords} />
			</Helmet>
		</HelmetProvider>
	);
};

Meta.defaultProps = {
	title: 'Welcome to Kosells',
	keywords: 'Electronics, Kosells, Ecommerce, Rajat',
	description: 'Buy the best products at the lowest prices',
};
export default Meta;
