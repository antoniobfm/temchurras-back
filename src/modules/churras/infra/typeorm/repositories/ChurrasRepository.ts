import { ICreateChurrasDTO } from '@modules/churras/dtos/Churras/ICreateChurrasDTO';
import IChurrasRepository from '@modules/churras/repositories/IChurrasRepository';
import { getRepository,  Repository } from 'typeorm';
import Churras from '../entities/Churras';



class ChurrasRepository implements IChurrasRepository {
	private ormRepository: Repository<Churras>;

	constructor() {
		this.ormRepository = getRepository(Churras);
	}

	public async create(churrasData: ICreateChurrasDTO): Promise<Churras> {
		const churras = this.ormRepository.create(churrasData);

		await this.ormRepository.save(churras);

		return churras;
	}

	public async findById(id: string): Promise<Churras | undefined> {
		const churras = await this.ormRepository.findOne(id, {relations: ['churras_presence', 'churras_presence.user', 'creator']});

		return churras;
	}
}

export default ChurrasRepository;
