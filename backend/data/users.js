import bcrypt from 'bcryptjs';

const users = [
	{
		name: 'Admin',
		email: 'admin@brand.com',
		password: bcrypt.hashSync('pass123', 12),
		isAdmin: true,
	},
	{
		name: 'Rajat',
		email: 'rajat@brand.com',
		password: bcrypt.hashSync('pass123', 12),
	},
	{
		name: 'Ravi',
		email: 'ravi@brand.com',
		password: bcrypt.hashSync('pass123', 12),
	},
];

export default users;
