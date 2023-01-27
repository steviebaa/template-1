import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

import { Account } from '@/entity/Account';

@Entity('profiles')
export class Profile extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: string;

	@Column({
		default: () => 'CURRENT_TIMESTAMP',
		type: 'timestamp',
	})
	dateCreated: Date;

	@Column({
		default: () => 'CURRENT_TIMESTAMP',
		type: 'timestamp',
	})
	dateUpdated: Date;

	@Column({ length: 30 })
	displayName: string;

	@Column({ length: 100 })
	email: string;

	@Column({ length: 30 })
	givenName: string;

	@OneToOne(() => Account, (account) => account.profile)
	@JoinColumn()
	profile: Relation<Account>;

	@Column({ length: 30, nullable: true })
	surname: string;
}
