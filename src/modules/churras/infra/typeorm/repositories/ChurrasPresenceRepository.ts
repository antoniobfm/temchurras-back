import { ICreateChurrasPresenceDTO } from '@modules/churras/dtos/ChurrasPresence/ICreateChurrasPresenceDTO';
import { IChurrasPresenceRepository } from '@modules/churras/repositories/IChurrasPresenceRepository';
import { getRepository, Repository } from 'typeorm';

import ChurrasPresence from '../entities/ChurrasPresence';

class ChurrasPresenceRepository implements IChurrasPresenceRepository {
	private ormRepository: Repository<ChurrasPresence>;

	constructor() {
		this.ormRepository = getRepository(ChurrasPresence);
	}

	public async create(data: ICreateChurrasPresenceDTO): Promise<ChurrasPresence> {
		const churrasPresence = this.ormRepository.create(data);

		await this.ormRepository.save(churrasPresence);

		return churrasPresence;
	}

	public async findByUserIdAndChurrasId(user_id: string, churras_id: string): Promise<ChurrasPresence | undefined> {
		const ticketBatch = this.ormRepository.findOne({ where: {user_id: user_id, churras_id: churras_id} });

		return ticketBatch;
	}

	public async delete(data: ChurrasPresence): Promise<void> {
		await this.ormRepository.delete({id: data.id});
	}

	public async save(data: ChurrasPresence): Promise<ChurrasPresence> {
		return await this.ormRepository.save(data)
	}
}

export default ChurrasPresenceRepository;
