import { getRepository, Repository, Not, MoreThan } from 'typeorm';

import { IVerificationCodesRepository } from '@modules/users/repositories/IVerificationCodesRepository';
import { VerificationCodes } from '../entities/VerificationCodes';
import ICreateVerificationCodesDTO from '@modules/users/dtos/VerificationCodes/ICreateVerificationCodesDTO';
import IVerifyCodeDTO from '@modules/users/dtos/VerificationCodes/IVerifyCodeDTO';
import { IFindValidCodesByUserIdDTO } from '@modules/users/dtos/VerificationCodes/IFindValidCodesByUserIdDTO';

class VerificationCodesRepository implements IVerificationCodesRepository {
	private ormRepository: Repository<VerificationCodes>;

	constructor() {
		this.ormRepository = getRepository(VerificationCodes);
	}

	public async verifyCode(data: IVerifyCodeDTO): Promise<VerificationCodes | undefined> {
		const verification_code = await this.ormRepository.findOne({where: {verification_code: data.verification_code, phone_number: data.phone_number, purpose: data.purpose, used_at: null}});

		return verification_code
	}

	public async createVerificationCode({ phone_number, purpose, verification_code }: ICreateVerificationCodesDTO): Promise<VerificationCodes> {
		const verification_code_sent = this.ormRepository.create({
			phone_number,
			verification_code,
			purpose
		});

		return await this.ormRepository.save(verification_code_sent);
	};

	public async findValidCodesByUserId({user_id, purpose}: IFindValidCodesByUserIdDTO): Promise<VerificationCodes[] | undefined> {
		const verification_codes = this.ormRepository.find({where: {user_id, purpose, used_at: null, created_at: MoreThan(new Date(Date.now() - (15 * 60 * 1000)))}});

		return verification_codes
	};

	public async useVerificationCode(verification_code: VerificationCodes): Promise<VerificationCodes> {
		const verification_code_used = await this.ormRepository.save({...verification_code, used_at: new Date()})

		return verification_code_used
	};
}

export {VerificationCodesRepository};
