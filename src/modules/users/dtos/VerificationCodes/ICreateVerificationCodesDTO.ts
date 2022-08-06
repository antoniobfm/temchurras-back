export default interface ICreateVerificationCodesDTO {
	phone_number: string;
	verification_code: string;
	purpose: 'password-recovery' | 'sms-verification';
}
