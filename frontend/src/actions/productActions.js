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
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_CREATE_FAILURE,
	PRODUCT_UPDATE_REQUEST,
	PRODUCT_UPDATE_SUCCESS,
	PRODUCT_UPDATE_FAILURE,
	PRODUCT_CREATE_REVIEW_REQUEST,
	PRODUCT_CREATE_REVIEW_SUCCESS,
	PRODUCT_CREATE_REVIEW_FAILURE,
} from '../constants/productConstants';
import axios from 'axios';

export const listProducts =
	(keyword = '') =>
	async (dispatch) => {
		try {
			dispatch({ type: PRODUCT_LIST_REQUEST });

			const { data } = await axios.get(
				`/api/products?keyword=${keyword}`
			);

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

export const createProduct = () => async (dispatch, getState) => {
	try {
		dispatch({ type: PRODUCT_CREATE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = userInfo.isSocialLogin
			? {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `SocialLogin ${userInfo.id}`,
					},
			  }
			: {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${userInfo.accessToken}`,
					},
			  };

		const { data } = await axios.post(`/api/products/`, {}, config);

		dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PRODUCT_CREATE_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateProduct = (product) => async (dispatch, getState) => {
	try {
		dispatch({ type: PRODUCT_UPDATE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = userInfo.isSocialLogin
			? {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `SocialLogin ${userInfo.id}`,
					},
			  }
			: {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${userInfo.accessToken}`,
					},
			  };

		const { data } = await axios.put(
			`/api/products/${product._id}`,
			product,
			config
		);

		dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PRODUCT_UPDATE_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const createProductReview =
	(productID, review) => async (dispatch, getState) => {
		try {
			dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

			const {
				userLogin: { userInfo },
			} = getState();

			const config = userInfo.isSocialLogin
				? {
						headers: {
							'Content-Type': 'application/json',
							Authorization: `SocialLogin ${userInfo.id}`,
						},
				  }
				: {
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${userInfo.accessToken}`,
						},
				  };

			await axios.post(
				`/api/products/${productID}/reviews`,
				review,
				config
			);

			dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
		} catch (error) {
			dispatch({
				type: PRODUCT_CREATE_REVIEW_FAILURE,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};
