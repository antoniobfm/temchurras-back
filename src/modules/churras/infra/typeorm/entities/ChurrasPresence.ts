import { User } from '@modules/users/infra/typeorm/entities/User';

import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
	OneToMany,
} from 'typeorm';
import Churras from './Churras';

@Entity('churras_presence')
class ChurrasPresence {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({type: "decimal", precision: 10, scale: 2})
	amount_contributed?: number;

	// Relationships

	@Column("uuid")
	churras_id: string;

	@ManyToOne(() => Churras)
	@JoinColumn({ name: 'churras_id' })
	churras: Churras;

	@Column("uuid")
	user_id: string;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user: User;

	// Default

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}

export default ChurrasPresence;
