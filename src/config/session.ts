const ONE_HOUR = 1000 * 60 * 60;

const THIRTY_MINUTES = ONE_HOUR / 2;

const SIX_HOURS = ONE_HOUR * 6;

const THREE_DAYS = SIX_HOURS * 12;

const { env } = process;

export const {
	SESSION_SECRET = env.APP_SECRET || 'A7YFHm9a8gj9e8th7898A09rj389ru23n4ybnf',
	SESSION_NAME = 'sid',
	SESSION_IDLE_TIMEOUT = THREE_DAYS,
	APP_WEB_URL,
	APP_WEB_DOMAIN,
} = env;

export const SESSION_ABSOLUTE_TIMEOUT = +(
	env.SESSION_ABSOLUTE_TIMEOUT || THREE_DAYS
);

export const SESSION_OPTIONS = {
	secret: SESSION_SECRET,
	name: SESSION_NAME,
	proxy: true,
	cookie: {
		maxAge: +SESSION_IDLE_TIMEOUT,
		secure: process.env.NODE_ENV === 'production',
	},
};
