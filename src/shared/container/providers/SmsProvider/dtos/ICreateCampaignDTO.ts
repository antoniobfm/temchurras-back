export default interface ICreateCampaignDTO {
	sender: string;
	addressBookId: number;
	body: string;
	transliterate: 0 | 1;
	route?: string;
	date?: string;
	emulate: 0 | 1;
}
