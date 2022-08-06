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
import ChurrasPresence from './ChurrasPresence';

@Entity('churras')
class Churras {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column("varchar")
	name: string;

	@Column("varchar")
	description: string;

	@Column({type: "decimal", precision: 10, scale: 2})
	suggested_contribution_with_drinks: number;

	@Column({type: "decimal", precision: 10, scale: 2})
	suggested_contribution_without_drinks: number;

	@Column("varchar")
	pix_key: string;

	@Column("varchar")
	pix_type: string;

	@Column('timestamptz')
	date: Date;


	// Relationships

	@OneToMany(() => ChurrasPresence, churrasPresence => churrasPresence.churras)
	churras_presence: ChurrasPresence[];

	@Column("uuid")
	creator_id: string;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'creator_id' })
	creator: User;


	// Standard

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}

export default Churras;
