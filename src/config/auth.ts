export default {
	secret_refresh_token: 'GYw4o8ifuq93gf3eoighv9qhajF93JQ3',
	secret_token: 'GYaSU8fa8sbfc8ABFbas9vb9BV9NJQ3',
	expires_in_token: '15m',
	expires_in_refresh_token: '30d',
	expires_refresh_token_days: 30,
	jwt: {
		secret: process.env.APP_SECRET || 'default',
		expiresIn: '1d',
	},
};
