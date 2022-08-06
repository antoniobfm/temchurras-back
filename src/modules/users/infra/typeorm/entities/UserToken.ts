import { Exclude } from 'class-transformer';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

import { User } from './User';

@Entity('user_tokens')
class UserTokens {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	refresh_token: string;

	@Column()
	user_id: string;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@Column()
	expires_date: Date;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	@Exclude()
	updated_at: Date;
}

export { UserTokens };
