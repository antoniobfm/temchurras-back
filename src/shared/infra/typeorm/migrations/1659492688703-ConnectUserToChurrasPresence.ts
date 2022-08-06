import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class ConnectUserToChurrasPresence1659492688703 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'churras_presence',
			new TableColumn({
				name: 'user_id',
				type: 'uuid',
			}),
		);

		await queryRunner.createForeignKey(
			'churras_presence',
			new TableForeignKey({
				name: 'UserToChurrasPresence',
				columnNames: ['user_id'],
				referencedTableName: 'users',
				referencedColumnNames: ['id'],
				onDelete: 'SET NULL',
				onUpdate: 'SET NULL',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('churras_presence', 'UserToChurrasPresence');

		await queryRunner.dropColumn('churras_presence', 'user_id');
	}
}
