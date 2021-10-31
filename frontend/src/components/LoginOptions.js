import React, { useEffect } from 'react';
import axios from 'axios';

const LoginOptions = ({ match }) => {
	const option = match.params.match;
	useEffect(() => {
		if (option) axios.get(`/api/auth/${option}`);
	}, [option]);
	return <div></div>;
};

export default LoginOptions;
