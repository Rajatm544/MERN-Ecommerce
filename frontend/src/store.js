import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
	productListReducer,
	productDetailsReducer,
	productDeleteReducer,
	productCreateReducer,
	productUpdateReducer,
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

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	productDelete: productDeleteReducer,
	productCreate: productCreateReducer,
	productUpdate: productUpdateReducer,
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

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];

const userInfoFromLocalStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress'))
	: {};

const tokenInfoFromLocalStoage = localStorage.getItem('refreshToken')
	? localStorage.getItem('refreshToken')
	: null;

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

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
