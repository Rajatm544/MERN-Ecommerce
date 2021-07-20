import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		if (variant === 'danger') {
			setTimeout(() => setVisible(false), 10000);
		} else {
			setTimeout(() => setVisible(false), 5000);
		}
	});

	if (visible) {
		return (
			<Alert variant={variant} dismissable>
				{/* <Alert.Heading>Oh snap!</Alert.Heading> */}
				{children}
			</Alert>
		);
	} else return null;
};

Message.defaultProps = {
	variant: 'info',
};

export default Message;
