import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ShippingPage = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const { cartItems } = cart;

	useEffect(() => {
		if (!(cartItems.length && userInfo)) {
			history.push('/');
		}
	}, [cartItems, history, userInfo]);

	return <div>SHIPPING PAGE</div>;
};

export default ShippingPage;
