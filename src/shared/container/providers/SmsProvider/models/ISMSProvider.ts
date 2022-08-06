import ISendVerificationCodeDTO from '../dtos/ISendVerificationCodeDTO';

export default interface ISMSProvider {
	sendVerificationCode(data: ISendVerificationCodeDTO): Promise<{result: boolean, campaign_id: number, counters: any}>;
}
