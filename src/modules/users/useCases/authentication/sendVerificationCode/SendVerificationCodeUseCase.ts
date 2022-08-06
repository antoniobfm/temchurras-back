import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import ISMSProvider from '@shared/container/providers/SmsProvider/models/ISMSProvider';
import { AppError } from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import generate from '@shared/utils/random6DigitGenerator';
import { IVerificationCodesRepository } from '@modules/users/repositories/IVerificationCodesRepository';



interface IRequest {
	phone_number: string;
}

@injectable()
class SendVerificationCodeUseCase {
	constructor(
		@inject('SMSProvider')
		private smsProvider: ISMSProvider,

		@inject('VerificationCodesRepository')
		private verificationCodesRepository: IVerificationCodesRepository,

		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
	) {}

	public async execute({ phone_number }: IRequest): Promise<any> {
		// formats phone number input
		const formatPhoneNumber = phone_number.replace(/[^0-9]/g, '');
		console.log(formatPhoneNumber)
		// const user = await this.usersRepository.findByPhoneNumber(formatPhoneNumber);

		// if (!user) {
		// 	throw new AppError('User not found');
		// }

		const verification_code = generate(5);

		const sms_dispatch = await this.smsProvider.sendVerificationCode({
			phone: `+55${formatPhoneNumber}`,
			verification_code: verification_code,
		});

		await this.verificationCodesRepository.createVerificationCode({
			phone_number: `+55${formatPhoneNumber}`,
			purpose: 'sms-verification',
			verification_code: verification_code,
		});

		// if (sms_dispatch.result !== true) {
		// 	throw new AppError('SMS dispatch failed');
		// }

		return { status: 'sms sent' }
	}
}

export { SendVerificationCodeUseCase };
