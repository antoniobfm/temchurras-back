import ICreateVerificationCodesDTO from '../dtos/VerificationCodes/ICreateVerificationCodesDTO';
import { IFindValidCodesByUserIdDTO } from '../dtos/VerificationCodes/IFindValidCodesByUserIdDTO';
import IVerifyCodeDTO from '../dtos/VerificationCodes/IVerifyCodeDTO';
import { VerificationCodes } from '../infra/typeorm/entities/VerificationCodes';

interface IVerificationCodesRepository {
	createVerificationCode(data: ICreateVerificationCodesDTO): Promise<VerificationCodes>;
	verifyCode(data: IVerifyCodeDTO): Promise<VerificationCodes | undefined>;
	useVerificationCode(verification_code: VerificationCodes): Promise<VerificationCodes>;
	findValidCodesByUserId(data: IFindValidCodesByUserIdDTO): Promise<VerificationCodes[] | undefined>;
}

export { IVerificationCodesRepository };
