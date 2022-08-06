import { container } from 'tsyringe';
import { IDateProvider } from './IDateProvider';
import { DayjsDateProvider } from './implementations/DayjsDateProvider';

const providers = {
	dayjs: DayjsDateProvider,
};

container.registerSingleton<IDateProvider>(
	"DayjsDateProvider",
	DayjsDateProvider
);
