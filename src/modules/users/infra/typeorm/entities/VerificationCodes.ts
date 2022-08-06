import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Entity('verification_codes')
class VerificationCodes {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar',)
	phone_number?: string;

	@Column('uuid',)
	user_id?: string;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@Column('varchar')
	verification_code: string;

	@Column('varchar')
	purpose: 'password-recovery' | 'sms-verification';

	@Column('timestamptz', { nullable: true })
	used_at?: Date;

	@CreateDateColumn()
	created_at: Date;
}

export { VerificationCodes };
