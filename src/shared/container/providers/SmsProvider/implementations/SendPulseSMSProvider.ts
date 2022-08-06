import sendpulse from 'sendpulse-api';
import smsConfig from '@config/sms';

import { injectable } from 'tsyringe';

import ISMSProvider from '../models/ISMSProvider';
import ISendVerificationCodeDTO from '../dtos/ISendVerificationCodeDTO';

@injectable()
export default class SendPulseSMSProvider implements ISMSProvider {
	async sendVerificationCode({
		phone,
		verification_code,
	}: ISendVerificationCodeDTO): Promise<any> {
		const info = {
			sender_name: 'TemChurras',
			phone: phone,
			body: 'TemChurras: ' + verification_code + ' e o seu codigo de verificacao. Nao compartilhe seu codigo.',
			transliterate: 1,
			route: {
				UA: "national",
			},
			emulate: 1
		}

		sendpulse.init(smsConfig.defaults.sendpulse.API_USER_ID, smsConfig.defaults.sendpulse.API_SECRET, smsConfig.defaults.sendpulse.TOKEN_STORAGE, () => {});

		sendpulse.smsSend(() => {}, info.sender_name, [info.phone], info.body, '', info.transliterate, info.route);
	}
}
