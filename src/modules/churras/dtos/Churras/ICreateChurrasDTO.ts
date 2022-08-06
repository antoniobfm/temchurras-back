
export interface ICreateChurrasDTO {
	creator_id: string;

	name: string;
	description: string;
	date: Date;

	suggested_contribution_with_drinks: number;
	suggested_contribution_without_drinks: number;

	pix_key:string;
	pix_type: string;
}
