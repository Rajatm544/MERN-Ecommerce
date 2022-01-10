import {
	USER_LOGIN_FAILURE,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_FAILURE,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_REQUEST,
	USER_RESET_PASSWORD_FAILURE,
	USER_RESET_PASSWORD_SUCCESS,
	USER_RESET_PASSWORD_REQUEST,
	USER_EMAIL_VERIFICATION_REQUEST,
	USER_EMAIL_VERIFICATION_SUCCESS,
	USER_EMAIL_VERIFICATION_FAILURE,
	USER_CONFIRM_REQUEST,
	USER_CONFIRM_SUCCESS,
	USER_CONFIRM_FAILURE,
	USER_DETAILS_FAILURE,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_REQUEST,
	USER_DETAILS_RESET,
	USER_PROFILE_UPDATE_REQUEST,
	USER_PROFILE_UPDATE_SUCCESS,
	USER_PROFILE_UPDATE_FAILURE,
	USER_PROFILE_UPDATE_RESET,
	USER_LOGIN_REFRESH_REQUEST,
	USER_LOGIN_REFRESH_SUCCESS,
	USER_LOGIN_REFRESH_FAILURE,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_FAILURE,
	USER_LIST_RESET,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_DELETE_FAILURE,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAILURE,
	USER_UPDATE_RESET,
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { ...state, loading: true };
		case USER_LOGIN_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_LOGIN_FAILURE:
			return { loading: false, error: action.payload };
		case USER_LOGOUT:
			return {};
		default:
			return { ...state };
	}
};

// use refresh token to obtain new access token for the logged in user
export const userLoginRefreshReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOGIN_REFRESH_REQUEST:
			return { ...state, loading: true };
		case USER_LOGIN_REFRESH_SUCCESS:
			return { loading: false, tokenInfo: action.payload };
		case USER_LOGIN_REFRESH_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return { ...state };
	}
};

// sending an email for account verification
export const userSendEmailVerficationReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_EMAIL_VERIFICATION_REQUEST:
			return { isLoading: true };
		case USER_EMAIL_VERIFICATION_SUCCESS:
			return { isLoading: true, emailSent: action.payload };
		case USER_EMAIL_VERIFICATION_FAILURE:
			return { isLoading: true, hasError: action.payload };
		default:
			return { ...state };
	}
};

// update user account to confirmed
export const userConfirmReducer = (state = { isConfirmed: false }, action) => {
	switch (action.type) {
		case USER_CONFIRM_REQUEST:
			return { ...state, loading: true };
		case USER_CONFIRM_SUCCESS:
			return { loading: false, isConfirmed: action.payload };
		case USER_CONFIRM_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return { ...state };
	}
};

// reset the user password
export const userResetPasswordReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_RESET_PASSWORD_REQUEST:
			return { ...state, loading: true };
		case USER_RESET_PASSWORD_SUCCESS:
			return { loading: false, resetPassword: action.payload };
		case USER_RESET_PASSWORD_FAILURE:
			return { loading: false, error: action.payload };
		default: {
			return { ...state };
		}
	}
};

// register user using email and password
export const userRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return { ...state, loading: true };
		case USER_REGISTER_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_REGISTER_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return { ...state };
	}
};

// fetch user details
export const userDetailsReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case USER_DETAILS_REQUEST:
			return { ...state, loading: true };
		case USER_DETAILS_SUCCESS:
			return { loading: false, user: action.payload };
		case USER_DETAILS_FAILURE:
			return { loading: false, error: action.payload };
		case USER_DETAILS_RESET:
			return { user: {} };
		default:
			return { ...state };
	}
};

// update user profile, not in admin view
export const userProfileUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_PROFILE_UPDATE_REQUEST:
			return { loading: true };
		case USER_PROFILE_UPDATE_SUCCESS:
			return { loading: false, success: true, userInfo: action.payload };
		case USER_PROFILE_UPDATE_FAILURE:
			return { loading: false, error: action.payload };
		case USER_PROFILE_UPDATE_RESET:
			return {};
		default:
			return { ...state };
	}
};

// list all users for the admin view
export const userListReducer = (state = { users: [] }, action) => {
	switch (action.type) {
		case USER_LIST_REQUEST:
			return { loading: true };
		case USER_LIST_SUCCESS:
			return {
				loading: false,
				users: action.payload.users,
				page: action.payload.page,
				pages: action.payload.pages,
				total: action.payload.total,
			};
		case USER_LIST_FAILURE:
			return { loading: false, error: action.payload };
		case USER_LIST_RESET:
			return { users: [] };
		default:
			return { ...state };
	}
};

export const userDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_DELETE_REQUEST:
			return { loading: true };
		case USER_DELETE_SUCCESS:
			return { loading: false, success: true };
		case USER_DELETE_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return { ...state };
	}
};

// update user from the admin panel view
export const userUpdateReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case USER_UPDATE_REQUEST:
			return { loading: true };
		case USER_UPDATE_SUCCESS:
			return { loading: false, success: true };
		case USER_UPDATE_FAILURE:
			return { loading: false, error: action.payload };
		case USER_UPDATE_RESET:
			return { user: {} };
		default:
			return { ...state };
	}
};
