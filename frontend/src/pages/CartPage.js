import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	Row,
	Col,
	Image,
	Form,
	ListGroup,
	Button,
	Card,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { addItem } from '../actions/cartActions';

const CartPage = ({ match, location, history }) => {
	const productID = match.params.id;
	const qty = location.search ? Number(location.search.split('=')[1]) : 1;
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	useEffect(() => {
		if (productID) {
			dispatch(addItem(productID, qty));
		}
	}, [dispatch, productID, qty]);

	return <>CART</>;
};

export default CartPage;
