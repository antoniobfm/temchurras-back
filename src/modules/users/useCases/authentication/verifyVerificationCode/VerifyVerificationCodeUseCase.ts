import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { IVerificationCodesRepository } from '@modules/users/repositories/IVerificationCodesRepository';



interface IRequest {
	phone_number: string;
	verification_code: string;
}

@injectable()
class VerifyVerificationCodeUseCase {
	constructor(
		@inject('VerificationCodesRepository')
		private verificationCodesRepository: IVerificationCodesRepository,

		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
	) {}

	public async execute({ phone_number, verification_code }: IRequest): Promise<any> {
		// formats phone number input
		const formatPhoneNumber = `+55${phone_number.replace(/[^0-9]/g, '')}`;

		const isVerificationCodeValid = await this.verificationCodesRepository.verifyCode({verification_code, phone_number: formatPhoneNumber, purpose: 'sms-verification'});

		if (!isVerificationCodeValid) {
			throw new AppError('Verification code is invalid');
		}

		// Use Code
		await this.verificationCodesRepository.useVerificationCode(isVerificationCodeValid);

		const user = await this.usersRepository.findByPhoneNumber(formatPhoneNumber);

		return user ? 'authenticate' : 'create';
	}
}

export { VerifyVerificationCodeUseCase };
