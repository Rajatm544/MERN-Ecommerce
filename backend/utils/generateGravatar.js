import gravatar from 'gravatar';

const generateGravatar = (email) => {
	const avatar = gravatar.url(email, {
		protocol: 'https',
		s: '200',
		r: 'PG',
		d: 'identicon',
	});
	return avatar;
};

export default generateGravatar;
