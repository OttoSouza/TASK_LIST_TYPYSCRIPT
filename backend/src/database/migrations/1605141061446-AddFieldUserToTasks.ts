import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class AddFieldUserToTasks1605141061446 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("tasks", new TableColumn({ 
            name: "user_id",
            type: "uuid"
        }));

        await queryRunner.createForeignKey("tasks", new TableForeignKey({
            name: "user_id_foreign",
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
            onUpdate: "CASCADE"
        }))

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("tasks", "user_id_foreign");
        await queryRunner.dropColumn("tasks", "user_id");
    }

}
