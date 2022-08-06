export default interface IVerifyCodeDTO {
	phone_number: string;
	verification_code: string;
	purpose: 'sms-verification';
}
