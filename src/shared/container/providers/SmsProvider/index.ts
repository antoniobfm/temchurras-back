import { container } from 'tsyringe';

import smsConfig from '@config/sms';

import SendPulseSMSProvider from './implementations/SendPulseSMSProvider';

import ISMSProvider from './models/ISMSProvider';

const providers = {
	sendpulse: SendPulseSMSProvider
};

container.registerSingleton<ISMSProvider>(
	'SMSProvider',
	SendPulseSMSProvider,
);
