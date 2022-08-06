import { ICreateChurrasPresenceDTO } from "../dtos/ChurrasPresence/ICreateChurrasPresenceDTO";
import ChurrasPresence from "../infra/typeorm/entities/ChurrasPresence";

export interface IChurrasPresenceRepository {
	create(data: ICreateChurrasPresenceDTO): Promise<ChurrasPresence>;
	findByUserIdAndChurrasId(user_id: string, churras_id: string): Promise<ChurrasPresence | undefined>;
	delete(data: ChurrasPresence): Promise<void>;
	save(data: ChurrasPresence): Promise<ChurrasPresence>;
}
