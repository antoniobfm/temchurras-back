import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateVerificationCodes1659546971248 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'verification_codes',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'phone_number',
						type: 'varchar',
					},
					{
						name: 'verification_code',
						type: 'varchar',
					},
					{
						name: 'purpose',
						type: 'varchar',
					},
					{
						name: 'used_at',
						type: 'timestamptz',
						isNullable: true
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()',
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('verification_codes');
	}
}
