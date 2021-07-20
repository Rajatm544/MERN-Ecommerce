import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
	productListReducers,
	productDetailsReducers,
} from './reducers/productReducers';

import { cartReducer } from './reducers/cartReducers';

import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';

const reducer = combineReducers({
	productList: productListReducers,
	productDetails: productDetailsReducers,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
});

const cartItemsfromLocalStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];

const userInfofromLocalStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

const initialState = {
	cart: {
		cartItems: [...cartItemsfromLocalStorage],
	},
	userLogin: {
		userInfo: userInfofromLocalStorage,
	},
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
