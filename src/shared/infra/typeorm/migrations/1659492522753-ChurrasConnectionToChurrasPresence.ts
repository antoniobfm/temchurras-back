import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class ChurrasConnectionToChurrasPresence1659492522753 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'churras_presence',
			new TableColumn({
				name: 'churras_id',
				type: 'uuid',
			}),
		);

		await queryRunner.createForeignKey(
			'churras_presence',
			new TableForeignKey({
				name: 'ChurrasToChurrasPresence',
				columnNames: ['churras_id'],
				referencedTableName: 'churras',
				referencedColumnNames: ['id'],
				onDelete: 'SET NULL',
				onUpdate: 'SET NULL',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('churras_presence', 'ChurrasToChurrasPresence');

		await queryRunner.dropColumn('churras_presence', 'churras_id');
	}
}
