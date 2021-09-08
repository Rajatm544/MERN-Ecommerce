import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, duration, children }) => {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		if (duration) {
			setTimeout(() => setVisible(false), duration * 1000);
		}
	});

	if (visible) {
		return <Alert variant={variant}>{children}</Alert>;
	} else return null;
};

Message.defaultProps = {
	variant: 'info',
};

export default Message;
