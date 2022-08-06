import {
	MigrationInterface,
	QueryRunner,
	TableColumn,
	TableForeignKey,
} from 'typeorm';

export default class UserConnectionToChurras1620174143569
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'churras',
			new TableColumn({
				name: 'creator_id',
				type: 'uuid',
			}),
		);

		await queryRunner.createForeignKey(
			'churras',
			new TableForeignKey({
				name: 'ChurrasToUser',
				columnNames: ['creator_id'],
				referencedTableName: 'users',
				referencedColumnNames: ['id'],
				onDelete: 'SET NULL',
				onUpdate: 'SET NULL',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('churras', 'ChurrasToUser');

		await queryRunner.dropColumn('churras', 'creator_id');
	}
}
