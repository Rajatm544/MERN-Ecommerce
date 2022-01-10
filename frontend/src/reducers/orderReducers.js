import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAILURE,
	ORDER_CREATE_RESET,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAILURE,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_FAILURE,
	ORDER_PAY_RESET,
	ORDER_DELIVER_REQUEST,
	ORDER_DELIVER_SUCCESS,
	ORDER_DELIVER_FAILURE,
	ORDER_DELIVER_RESET,
	ORDER_USER_LIST_REQUEST,
	ORDER_USER_LIST_SUCCESS,
	ORDER_USER_LIST_FAILURE,
	ORDER_USER_LIST_RESET,
	ORDER_ALL_LIST_REQUEST,
	ORDER_ALL_LIST_SUCCESS,
	ORDER_ALL_LIST_FAILURE,
} from '../constants/orderConstants';

// create an order
export const orderCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_CREATE_REQUEST:
			return {
				loading: true,
			};
		case ORDER_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
				order: action.payload,
			};
		case ORDER_CREATE_FAILURE:
			return {
				loading: false,
				error: action.payload,
			};
		case ORDER_CREATE_RESET:
			return {};
		default:
			return { ...state };
	}
};

// get order details
export const orderDetailsReducer = (
	state = { loading: true, orderItems: [], shippingAddress: {} },
	action
) => {
	switch (action.type) {
		case ORDER_DETAILS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case ORDER_DETAILS_SUCCESS:
			return {
				loading: false,
				order: action.payload,
			};
		case ORDER_DETAILS_FAILURE:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return { ...state };
	}
};

// update order payment options
export const orderPayReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_PAY_REQUEST:
			return {
				...state,
				loading: true,
			};
		case ORDER_PAY_SUCCESS:
			return {
				loading: false,
				success: true,
			};
		case ORDER_PAY_FAILURE:
			return {
				loading: false,
				error: action.payload,
			};
		case ORDER_PAY_RESET:
			return {};
		default:
			return { ...state };
	}
};

// update order to be delivered or not
export const orderDeliverReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_DELIVER_REQUEST:
			return {
				...state,
				loading: true,
			};
		case ORDER_DELIVER_SUCCESS:
			return {
				loading: false,
				success: true,
			};
		case ORDER_DELIVER_FAILURE:
			return {
				loading: false,
				error: action.payload,
			};
		case ORDER_DELIVER_RESET:
			return {};
		default:
			return { ...state };
	}
};

// reducer to list orders of the particular user
export const orderListUserReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case ORDER_USER_LIST_REQUEST:
			return {
				...state,
				loading: true,
			};
		case ORDER_USER_LIST_SUCCESS:
			return {
				loading: false,
				orders: action.payload,
			};
		case ORDER_USER_LIST_FAILURE:
			return {
				loading: false,
				error: action.payload,
			};
		case ORDER_USER_LIST_RESET:
			return { orders: [] };
		default:
			return { ...state };
	}
};

// reducer to list all orders for the admin panel view
export const orderListAllReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case ORDER_ALL_LIST_REQUEST:
			return {
				...state,
				loading: true,
			};
		case ORDER_ALL_LIST_SUCCESS:
			return {
				loading: false,
				orders: action.payload.orders,
				page: action.payload.page,
				pages: action.payload.pages,
				total: action.payload.total,
			};
		case ORDER_ALL_LIST_FAILURE:
			return {
				loading: false,
				error: action.payload,
			};

		default:
			return { ...state };
	}
};
