import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateChurras1620173268118 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'churras',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'name',
						type: 'varchar',
					},
					{
						name: 'description',
						type: 'varchar',
					},
					{
						name: 'date',
						type: 'timestamptz',
					},
					{
						name: 'suggested_contribution_with_drinks',
						type: 'decimal',
						precision: 10,
						scale: 2
					},
					{
						name: 'suggested_contribution_without_drinks',
						type: 'decimal',
						precision: 10,
						scale: 2
					},
					{
						name: 'pix_key',
						type: 'varchar',
					},
					{
						name: 'pix_type',
						type: 'varchar',
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()',
					},
					{
						name: 'updated_at',
						type: 'timestamp',
						default: 'now()',
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('churras');
	}
}
