import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAILURE,
	USER_LOGIN_REFRESH_REQUEST,
	USER_LOGIN_REFRESH_SUCCESS,
	USER_LOGIN_REFRESH_FAILURE,
	USER_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAILURE,
	USER_RESET_PASSWORD_REQUEST,
	USER_RESET_PASSWORD_SUCCESS,
	USER_RESET_PASSWORD_FAILURE,
	USER_EMAIL_VERIFICATION_REQUEST,
	USER_EMAIL_VERIFICATION_SUCCESS,
	USER_EMAIL_VERIFICATION_FAILURE,
	USER_CONFIRM_REQUEST,
	USER_CONFIRM_SUCCESS,
	USER_CONFIRM_FAILURE,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAILURE,
	USER_DETAILS_RESET,
	USER_PROFILE_UPDATE_REQUEST,
	USER_PROFILE_UPDATE_SUCCESS,
	USER_PROFILE_UPDATE_FAILURE,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_FAILURE,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_DELETE_FAILURE,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAILURE,
} from '../constants/userConstants';
import {
	ORDER_CREATE_RESET,
	ORDER_USER_LIST_RESET,
} from '../constants/orderConstants';
import axios from 'axios';

// login an user, can be a social login or a normal email verified login
export const loginUser = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_LOGIN_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post(
			'/api/users/login',
			{ email, password },
			config
		);

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: { ...data, isSocialLogin: false },
		});
		dispatch({
			type: USER_LOGIN_REFRESH_SUCCESS,
			payload: data.refreshToken,
		});
		// store the refresh token and the rest of the user info in the local storage
		localStorage.setItem('refreshToken', data.refreshToken);
		localStorage.setItem(
			'userInfo',
			JSON.stringify({ ...data, isSocialLogin: false })
		);
		// remove the variable that helps prompt the user that email is not verified, each time they login
		localStorage.removeItem('promptEmailVerfication');
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// used for refreshing the access tokens when the user logs in using email and password
export const refreshLogin = (email) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_LOGIN_REFRESH_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();

		// avoid this if social login
		if (userInfo.isSocialLogin) {
			dispatch({ type: USER_LOGIN_REFRESH_SUCCESS, payload: null });
		} else {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const { data } = await axios.post(
				'/api/users/refresh',
				{
					email,
					token: userInfo.refreshToken,
				},
				config
			);

			if (data.success) {
				dispatch({ type: USER_LOGIN_REFRESH_SUCCESS, payload: data });
				const updatedUser = {
					...userInfo,
					accessToken: data.accessToken,
					refreshToken: userInfo.refreshToken,
				};
				// update the local storage
				localStorage.setItem('userInfo', JSON.stringify(updatedUser));
				dispatch({ type: USER_LOGIN_SUCCESS, payload: updatedUser });
			} else if (!data.success) {
				// set a variable in local storage which redirects to login page, if this refresh thing fails
				localStorage.removeItem('userInfo');
				localStorage.setItem('redirectLogin', 'true'); // after refresh token also expires, redirect to login page after loggin out the user
				dispatch({ type: USER_LOGOUT });
			}
		}
	} catch (error) {
		dispatch({
			type: USER_LOGIN_REFRESH_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// logout by removing all local storage info
export const logoutUser = () => (dispatch) => {
	localStorage.removeItem('userInfo');
	localStorage.removeItem('redirectLogin');
	localStorage.removeItem('cartItems');
	dispatch({ type: USER_LOGOUT });
	dispatch({ type: USER_DETAILS_RESET });
	dispatch({ type: ORDER_CREATE_RESET });
	dispatch({ type: ORDER_USER_LIST_RESET });
};

// register a new user with the form for name, email, password
export const registerUser = (name, email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_REGISTER_REQUEST });
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post(
			'/api/users/',
			{ name, email, password },
			config
		);

		dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// send an email for verification of the newly registered account
export const sendVerficationEmail = (email) => async (dispatch) => {
	try {
		dispatch({ type: USER_EMAIL_VERIFICATION_REQUEST });
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post(
			'/api/users/confirm',
			{ email },
			config
		);
		dispatch({ type: USER_EMAIL_VERIFICATION_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: USER_EMAIL_VERIFICATION_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// take the email token sent from the mail, and confirm the account once the link is clicked
export const confirmUser =
	(emailToken, alreadyLoggedIn = false) =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: USER_CONFIRM_REQUEST });
			const { data } = await axios.get(
				`/api/users/confirm/${emailToken}`
			);

			// remove variable meant to prompt the user for email verification
			localStorage.removeItem('promptEmailVerfication');
			dispatch({ type: USER_CONFIRM_SUCCESS, payload: true });

			if (alreadyLoggedIn) {
				dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
				dispatch({
					type: USER_LOGIN_REFRESH_SUCCESS,
					payload: data.refreshToken,
				});
				localStorage.setItem('refreshToken', data.refreshToken);
				localStorage.setItem('userInfo', JSON.stringify(data));
			}

			localStorage.removeItem('promptEmailVerfication');
		} catch (error) {
			dispatch({
				type: USER_CONFIRM_FAILURE,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

// reset the user password and send one more verification email from the server
export const resetUserPassword =
	(passwordToken, password) => async (dispatch) => {
		try {
			dispatch({ type: USER_RESET_PASSWORD_REQUEST });

			// make the api call to reset the password
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const { data } = await axios.put(
				'/api/users/reset',
				{ passwordToken, password },
				config
			);

			dispatch({ type: USER_RESET_PASSWORD_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: USER_RESET_PASSWORD_FAILURE,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

// get user details for profile page
export const getUserDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_DETAILS_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		if (userInfo.isSocialLogin) {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			let { data } = await axios.post(
				'/api/users/passport/data/',
				{ id },
				config
			);
			dispatch({
				type: USER_DETAILS_SUCCESS,
				payload: { ...data, isSocialLogin: true },
			});
		} else {
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo.accessToken}`,
				},
			};

			const { data } = await axios.get(`/api/users/${id}`, config);
			dispatch({
				type: USER_DETAILS_SUCCESS,
				payload: { ...data, isSocialLogin: false },
			});
		}
	} catch (error) {
		dispatch({
			type: USER_DETAILS_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// update details in the user profile page
export const updateUserProfile = (user) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_PROFILE_UPDATE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		// different headers are used when it is a social login, and when it is a std email login
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

		const isSocial = userInfo.isSocialLogin;
		const { data } = await axios.put('/api/users/profile', user, config);

		dispatch({
			type: USER_PROFILE_UPDATE_SUCCESS,
			payload: { ...data, isSocialLogin: isSocial },
		});

		// login the user after updating the information
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: { ...data, isSocialLogin: isSocial },
		});

		localStorage.setItem(
			'userInfo',
			JSON.stringify({ ...data, isSocialLogin: isSocial })
		);
	} catch (error) {
		dispatch({
			type: USER_PROFILE_UPDATE_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// fetch a list of all users, for the admin panel view
export const listAllUsers =
	(pageNumber = '') =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: USER_LIST_REQUEST });

			const {
				userLogin: { userInfo },
			} = getState();

			// different headers are used when it is a social login, and when it is a std email login
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

			const { data } = await axios.get(
				`/api/users?pageNumber=${pageNumber}`,
				config
			);

			dispatch({ type: USER_LIST_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: USER_LIST_FAILURE,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

// delete the user from the admin panel view
export const deleteUser = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_DELETE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		// different headers are used when it is a social login, and when it is a std email login
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

		await axios.delete(`/api/users/${id}`, config);

		dispatch({ type: USER_DELETE_SUCCESS });
	} catch (error) {
		dispatch({
			type: USER_DELETE_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// update the user details
export const updateUser = (user) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_UPDATE_REQUEST });

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

		const isSocial = userInfo.isSocialLogin;
		const { data } = await axios.put(
			`/api/users/${user._id}`,
			user,
			config
		);

		dispatch({ type: USER_UPDATE_SUCCESS });
		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: { ...data, isSocialLogin: isSocial },
		});

		if (data.id === userInfo.id) {
			// // login the user after updating the information
			const newUserInfo = {
				...userInfo,
				...userInfo,
				id: data.id,
				name: data.name,
				email: data.email,
				isAdmin: data.isAdmin,
				isConfirmed: data.isConfirmed,
			};
			dispatch({
				type: USER_LOGIN_SUCCESS,
				payload: newUserInfo,
			});

			localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
		}
	} catch (error) {
		dispatch({
			type: USER_UPDATE_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
