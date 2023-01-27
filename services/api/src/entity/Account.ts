import { AccountStatus, AccountType } from 'common';
import { BaseEntity, Column, Entity, OneToOne, PrimaryColumn, Relation } from 'typeorm';

import { Preferences } from '@/entity/Preferences';
import { Profile } from '@/entity/Profile';

@Entity('accounts')
export class Account extends BaseEntity {
	@PrimaryColumn({ length: 36 })
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

	@Column({
		default: false,
	})
	forceSignOut: boolean;

	@Column({
		default: false,
	})
	hasAcceptedTerms: boolean;

	@OneToOne(() => Profile, (preferences) => preferences.profile, { cascade: true })
	profile: Relation<Profile>;

	@OneToOne(() => Preferences, (preferences) => preferences.account, { cascade: true })
	preferences: Relation<Preferences>;

	@Column({
		default: AccountType.USER,
		enum: AccountType,
		type: 'enum',
	})
	role: AccountType;

	@Column({
		default: AccountStatus.ACTIVE,
		enum: AccountStatus,
		type: 'enum',
	})
	status: AccountStatus;
}
