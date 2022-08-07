
interface ISMSConfig {
	driver: 'sendpulse';

	defaults: {
		sendpulse: {
			API_USER_ID: string,
			API_SECRET: string,
			TOKEN_STORAGE: string
		}
	};
}

export default {
	driver: process.env.SMS_DRIVER || 'sendpulse',

	defaults: {
		sendpulse: {
			API_USER_ID: process.env.SENDPULSE_API_USER_ID,
			API_SECRET: process.env.SENDPULSE_API_SECRET,
			TOKEN_STORAGE: process.env.SENDPULSE_TOKEN_STORAGE
		}
	},
} as ISMSConfig;
