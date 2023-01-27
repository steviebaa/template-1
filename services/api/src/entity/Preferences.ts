import { ThemeMode } from 'common';
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

import { Account } from '@/entity/Account';

export enum FontSize {
	'TWELVE' = 12,
	'FOURTEEN' = 14,
	'SIXTEEN' = 16,
	'EIGHTEEN' = 18,
	'TWENTY' = 20,
	'TWENTY_TWO' = 22,
	'TWENTY_FOUR' = 24,
}

@Entity('preferences')
export class Preferences extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: string;

	@OneToOne(() => Account, (account) => account.preferences)
	@JoinColumn()
	account: Relation<Account>;

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
		default: FontSize.SIXTEEN,
		enum: FontSize,
		type: 'enum',
	})
	fontSize: number;

	@Column({
		default: ThemeMode.SYSTEM,
		enum: ThemeMode,
		type: 'enum',
	})
	theme: ThemeMode;
}
