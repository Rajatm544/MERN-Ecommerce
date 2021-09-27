import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, duration, children }) => {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		setVisible(true);
	}, []);

	useEffect(() => {
		if (duration) {
			setTimeout(() => setVisible(false), duration * 1000);
		}
	});

	return (
		<Alert
			style={visible ? { display: 'block' } : { display: 'none' }}
			variant={variant}>
			{children}
		</Alert>
	);
};

Message.defaultProps = {
	variant: 'info',
};

export default Message;
