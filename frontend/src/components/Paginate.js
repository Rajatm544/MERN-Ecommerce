import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// different paginate components for products, and for admin panel view
const Paginate = ({
	pages,
	page,
	isAdmin = false,
	keyword = '',
	forOrders = false,
	forUsers = false,
}) => {
	return (
		pages > 1 && (
			<Pagination>
				{[...Array(pages).keys()].map((ele) => (
					<LinkContainer
						key={ele + 1}
						to={
							isAdmin
								? forOrders
									? `/admin/orderlist/${ele + 1}`
									: forUsers
									? `/admin/userlist/${ele + 1}`
									: `/admin/productlist/${ele + 1}`
								: keyword
								? `/search/${keyword}/page/${ele + 1}`
								: `/page/${ele + 1}`
						}>
						<Pagination.Item active={ele + 1 === Number(page)}>
							{ele + 1}
						</Pagination.Item>
					</LinkContainer>
				))}
			</Pagination>
		)
	);
};

export default Paginate;
