var whitelist = ['http://localhost:3000', process.env.APP_WEB_URL];

const CORS_OPTIONS = {
	origin: function (origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
	credentials: true,
};

export default CORS_OPTIONS;
