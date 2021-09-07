import {
	PRODUCT_DETAILS_FAILURE,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_LIST_FAILURE,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_DELETE_FAILURE,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
} from '../constants/productConstants';
import axios from 'axios';

export const listProducts = () => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST });

		const { data } = await axios.get('/api/products');

		dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PRODUCT_LIST_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listProductDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_DETAILS_REQUEST });

		const { data } = await axios.get(`/api/products/${id}`);

		dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PRODUCT_DETAILS_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deleteProduct = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: PRODUCT_DELETE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = userInfo.isSocialLogin
			? {
					headers: {
						Authorization: `SocialLogin ${userInfo.id}`,
					},
			  }
			: {
					headers: {
						Authorization: `Bearer ${userInfo.accessToken}`,
					},
			  };

		const { data } = await axios.delete(`/api/products/${id}`, config);

		data && dispatch({ type: PRODUCT_DELETE_SUCCESS });
	} catch (error) {
		dispatch({
			type: PRODUCT_DELETE_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
