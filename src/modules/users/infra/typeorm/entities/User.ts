import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import Churras from '@modules/churras/infra/typeorm/entities/Churras';
import ChurrasPresence from '@modules/churras/infra/typeorm/entities/ChurrasPresence';

@Entity('users')
class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar')
	name?: string;

	@Column('varchar', { unique: true })
	phone_number: string;

	@OneToMany(() => Churras, churras => churras.creator, {})
	organizing: Churras[];

	@OneToMany(() => ChurrasPresence, churrasPresence => churrasPresence.user, {})
	churras_presence: ChurrasPresence[];

	@CreateDateColumn()
	@Exclude()
	created_at: Date;

	@UpdateDateColumn()
	@Exclude()
	updated_at: Date;
}

export { User };
