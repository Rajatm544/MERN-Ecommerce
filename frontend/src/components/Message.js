import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
	const [visible, setVisible] = useState(true);

	// useEffect(() => {
	// 	if (variant === 'danger' || variant === 'info') {
	// 		setTimeout(() => setVisible(false), 10000);
	// 	} else {
	// 		setTimeout(() => setVisible(false), 8000);
	// 	}
	// });

	if (visible) {
		return <Alert variant={variant}>{children}</Alert>;
	} else return null;
};

Message.defaultProps = {
	variant: 'info',
};

export default Message;
