import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			const item = action.payload;

			// check if the item exists in the cart
			const existingItem = state.cartItems.find(
				(ele) => ele.product === item.product
			);
			if (existingItem) {
				return {
					...state,
					cartItems: state.cartItems.map((ele) =>
						ele.product === existingItem.product ? item : ele
					),
				};
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, item],
				};
			}
		default:
			return { ...state };
	}
};
