
import { ICreateChurrasDTO } from '../dtos/Churras/ICreateChurrasDTO';
import Churras from '../infra/typeorm/entities/Churras';

export default interface IChurrasRepository {
	findById(id: string): Promise<Churras | undefined>;
	create(data: ICreateChurrasDTO): Promise<Churras>;
	// save(data: Churras): Promise<Churras>;
}
