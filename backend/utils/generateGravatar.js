import gravatar from 'gravatar';

const generateGravatar = (email) => {
	// generate a url for the gravatar that is using https
	const avatar = gravatar.url(email, {
		protocol: 'https',
		s: '200', // size: 200x200
		r: 'PG', // rating: PG
		d: 'identicon', // default: identicon
	});
	return avatar;
};

export default generateGravatar;
