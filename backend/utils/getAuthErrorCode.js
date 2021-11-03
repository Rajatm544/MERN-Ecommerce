// This is used to send the correct error code to be sent to as the parameter after redirecting to frontend after failed passport login
const getAuthErrorCode = (msg) => {
	// This msg is obtained as the flash message from the passport login routes
	if (msg === 'Registered using google account') return 0;
	if (msg === 'Registered using github account') return 1;
	if (msg === 'Registered using twitter account') return 2;
	if (msg === 'Registered using linkedin account') return 3;
};

export default getAuthErrorCode;
