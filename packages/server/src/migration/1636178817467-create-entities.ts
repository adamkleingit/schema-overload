import { MigrationInterface, QueryRunner } from "typeorm";

export class createEntities1636178817467 implements MigrationInterface {
  name = "createEntities1636178817467";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "manufacturer" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_6285223bd8e845a3e7107446ffb" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "car" ("id" SERIAL NOT NULL, "bodyType" character varying NOT NULL, "manufactureDate" TIMESTAMP NOT NULL, "manufacturerId" integer, CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "car" ADD CONSTRAINT "FK_a6fa61be7ad43d2ee9c19cda15c" FOREIGN KEY ("manufacturerId") REFERENCES "manufacturer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "car" DROP CONSTRAINT "FK_a6fa61be7ad43d2ee9c19cda15c"`
    );
    await queryRunner.query(`DROP TABLE "car"`);
    await queryRunner.query(`DROP TABLE "manufacturer"`);
  }
}
