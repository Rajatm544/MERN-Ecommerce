import axios from 'axios';
import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants';

// get the product id and the quantity of the item to add to the cart
export const addItem = (id, qty) => async (dispatch, getState) => {
	try {
		const { data } = await axios.get(`/api/products/${id}`);
		dispatch({
			type: CART_ADD_ITEM,
			payload: {
				product: data._id,
				name: data.name,
				image: data.image,
				price: data.price,
				countInStock: data.countInStock,
				qty,
			},
		});

		// update the local storage with the new cart
		localStorage.setItem(
			'cartItems',
			JSON.stringify(getState().cart.cartItems)
		);
	} catch (error) {
		console.error(error);
	}
};

// get the product id to be removed from the cart
export const removeItem = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: CART_REMOVE_ITEM,
			payload: id,
		});
		// update the local storage with the updated cart
		localStorage.setItem(
			'cartItems',
			JSON.stringify(getState().cart.cartItems)
		);
	} catch (error) {
		console.log(error);
	}
};

// get the shipping address data and dispatch corresponding action
export const saveShippingAddress = (data) => async (dispatch) => {
	try {
		dispatch({
			type: CART_SAVE_SHIPPING_ADDRESS,
			payload: data,
		});
		localStorage.setItem('shippingAddress', JSON.stringify(data));
	} catch (error) {
		console.log(error);
	}
};

// get the option for payment and update the local storage as well
export const savePaymentMethod = (data) => async (dispatch) => {
	try {
		dispatch({
			type: CART_SAVE_PAYMENT_METHOD,
			payload: data,
		});
		localStorage.setItem('paymentMethod', JSON.stringify(data));
	} catch (error) {
		console.log(error);
	}
};
