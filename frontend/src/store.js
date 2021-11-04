import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
	productListReducer,
	productDetailsReducer,
	productDeleteReducer,
	productCreateReducer,
	productCreateReviewReducer,
	productUpdateReducer,
	productTopRatedReducer,
} from './reducers/productReducers';

import { cartReducer } from './reducers/cartReducers';

import {
	userLoginReducer,
	userLoginRefreshReducer,
	userRegisterReducer,
	userSendEmailVerficationReducer,
	userConfirmReducer,
	userResetPasswordReducer,
	userDetailsReducer,
	userProfileUpdateReducer,
	userListReducer,
	userDeleteReducer,
	userUpdateReducer,
} from './reducers/userReducers';

import {
	orderCreateReducer,
	orderDetailsReducer,
	orderPayReducer,
	orderDeliverReducer,
	orderListUserReducer,
	orderListAllReducer,
} from './reducers/orderReducers';

// combine all the above reducers to the store
const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	productDelete: productDeleteReducer,
	productCreate: productCreateReducer,
	productCreateReview: productCreateReviewReducer,
	productUpdate: productUpdateReducer,
	productTopRated: productTopRatedReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userLoginRefresh: userLoginRefreshReducer,
	userRegister: userRegisterReducer,
	userSendEmailVerfication: userSendEmailVerficationReducer,
	userConfirm: userConfirmReducer,
	userResetPassword: userResetPasswordReducer,
	userDetails: userDetailsReducer,
	userProfileUpdate: userProfileUpdateReducer,
	userList: userListReducer,
	userDelete: userDeleteReducer,
	userUpdate: userUpdateReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	orderDeliver: orderDeliverReducer,
	orderListUser: orderListUserReducer,
	orderListAll: orderListAllReducer,
});

// get a few cart items from the local storage
const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];

// get the user info from local storage
const userInfoFromLocalStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

// get the shipping address from local storage
const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress'))
	: {};

// get refresh token from the local storage
const tokenInfoFromLocalStoage = localStorage.getItem('refreshToken')
	? localStorage.getItem('refreshToken')
	: null;

// set the initial state based on above local storage values
const initialState = {
	cart: {
		cartItems: [...cartItemsFromLocalStorage],
		shippingAddress: shippingAddressFromLocalStorage,
	},
	userLogin: {
		userInfo: userInfoFromLocalStorage,
	},
	userLoginRefresh: {
		tokenInfo: tokenInfoFromLocalStoage,
	},
};

// user redux thunk for making async calls
const middleware = [thunk];

// create the redux store
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
