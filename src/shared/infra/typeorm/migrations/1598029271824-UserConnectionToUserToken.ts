import {
	MigrationInterface,
	QueryRunner,
	TableColumn,
	TableForeignKey,
} from 'typeorm';

export default class UserConnectionToUserToken1598029271824
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'user_tokens',
			new TableColumn({
				name: 'user_id',
				type: 'uuid',
			}),
		);

		await queryRunner.createForeignKey(
			'user_tokens',
			new TableForeignKey({
				name: 'UserTokenToUser',
				columnNames: ['user_id'],
				referencedTableName: 'users',
				referencedColumnNames: ['id'],
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('user_tokens', 'UserTokenToUser');

		await queryRunner.dropColumn('user_tokens', 'user_id');
	}
}
