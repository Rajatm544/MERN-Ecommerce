import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
	return (
		<Alert variant={variant}>
			<Alert.Heading>Oh snap!</Alert.Heading>
			{children}
		</Alert>
	);
};

Message.defaultProps = {
	variant: 'info',
};

export default Message;
