import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class UserConnectionToVerificationCodes1659547130281 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'verification_codes',
			new TableColumn({
				name: 'user_id',
				type: 'uuid',
				isNullable: true
			}),
		);

		await queryRunner.createForeignKey(
			'verification_codes',
			new TableForeignKey({
				name: 'UserToVerificationCodes',
				columnNames: ['user_id'],
				referencedTableName: 'users',
				referencedColumnNames: ['id'],
				onDelete: 'SET NULL',
				onUpdate: 'SET NULL',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('verification_codes', 'UserToVerificationCodes');

		await queryRunner.dropColumn('verification_codes', 'user_id');
	}
}
