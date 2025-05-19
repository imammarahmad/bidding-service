import { faker } from '@faker-js/faker';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { uuidv7 } from 'uuidv7';

interface User {
  id: string;
  name: string;
  email: string;
}

export class SeedUsers1716123456790 implements MigrationInterface {
  private generateUsers(count: number): User[] {
    const users: User[] = [];

    for (let i = 1; i <= count; i++) {
      users.push({
        id: uuidv7(),
        name: faker.person.fullName(),
        email: `user${i}@example.com`,
      });
    }
    return users;
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    const users = this.generateUsers(100);

    for (const user of users) {
      await queryRunner.query(
        `INSERT INTO "user" ("id", "name", "email") VALUES ($1, $2, $3)`,
        [user.id, user.name, user.email],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE "user" CASCADE`);
  }
}
