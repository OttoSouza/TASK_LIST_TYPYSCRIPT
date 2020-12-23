import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTasks1604888405818 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "tasks",
        columns: [
          {
            name: "id",
            type: "uuid",
            generationStrategy: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "task_name",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "initial_date",
            type: "timestamp",
          },
          {
            name: "end_date",
            type: "timestamp",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("tasks");
  }
}
