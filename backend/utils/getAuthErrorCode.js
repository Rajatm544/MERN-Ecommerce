const getAuthErrorCode = (msg) => {
	if (msg === 'Registered using google account') return 0;
	if (msg === 'Registered using github account') return 1;
	if (msg === 'Registered using twitter account') return 2;
	if (msg === 'Registered using linkedin account') return 3;
};

export default getAuthErrorCode;
