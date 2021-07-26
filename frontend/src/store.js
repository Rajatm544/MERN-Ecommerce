import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
	productListReducers,
	productDetailsReducers,
} from './reducers/productReducers';

import { cartReducer } from './reducers/cartReducers';

import {
	userLoginReducer,
	userLoginRefreshReducer,
	userRegisterReducer,
	userConfirmReducer,
	userDetailsReducer,
	userProfileUpdateReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
	productList: productListReducers,
	productDetails: productDetailsReducers,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userLoginRefresh: userLoginRefreshReducer,
	userRegister: userRegisterReducer,
	userConfirm: userConfirmReducer,
	userDetails: userDetailsReducer,
	userProfileUpdate: userProfileUpdateReducer,
});

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];

const userInfoFromLocalStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

const tokenInfoFromLocalStoage = localStorage.getItem('refreshToken')
	? localStorage.getItem('refreshToken')
	: null;

const initialState = {
	cart: {
		cartItems: [...cartItemsFromLocalStorage],
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
