import bcrypt from 'bcryptjs';

const users = [
	{
		name: 'Admin',
		email: 'admin@brand.com',
		password: bcrypt.hashSync('pass123', 12),
		isAdmin: true,
		isConfirmed: true,
	},
	{
		name: 'Rajat',
		email: 'rajat@brand.com',
		password: bcrypt.hashSync('pass123', 12),
		isConfirmed: true,
	},
	{
		name: 'Ravi',
		email: 'ravi@brand.com',
		password: bcrypt.hashSync('pass123', 12),
		isConfirmed: true,
	},
	{
		name: 'Voca',
		email: 'dataxom889@flmmo.com',
		password: bcrypt.hashSync('pass123', 12),
		isConfirmed: true,
	},
];

export default users;
