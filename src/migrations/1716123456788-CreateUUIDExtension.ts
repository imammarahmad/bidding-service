import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUUIDExtension1716123456788 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the UUID extension if it doesn't exist
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    // Create the UUID v7 function
    await queryRunner.query(`
            CREATE OR REPLACE FUNCTION uuid_generate_v7()
            RETURNS uuid
            AS $$
            DECLARE
                v7uuid uuid;
                unix_ts_ms bytea;
                uuid_bytes bytea;
            BEGIN
                -- Get Unix timestamp in milliseconds
                unix_ts_ms := decode(lpad(to_hex(floor(extract(epoch from clock_timestamp()) * 1000)::bigint), 12, '0'), 'hex');
                
                -- Generate random bytes
                uuid_bytes := decode(lpad(to_hex(floor(random() * 256)::int), 2, '0'), 'hex');
                uuid_bytes := uuid_bytes || decode(lpad(to_hex(floor(random() * 256)::int), 2, '0'), 'hex');
                uuid_bytes := uuid_bytes || decode(lpad(to_hex(floor(random() * 256)::int), 2, '0'), 'hex');
                uuid_bytes := uuid_bytes || decode(lpad(to_hex(floor(random() * 256)::int), 2, '0'), 'hex');
                uuid_bytes := uuid_bytes || decode(lpad(to_hex(floor(random() * 256)::int), 2, '0'), 'hex');
                uuid_bytes := uuid_bytes || decode(lpad(to_hex(floor(random() * 256)::int), 2, '0'), 'hex');
                uuid_bytes := uuid_bytes || decode(lpad(to_hex(floor(random() * 256)::int), 2, '0'), 'hex');
                uuid_bytes := uuid_bytes || decode(lpad(to_hex(floor(random() * 256)::int), 2, '0'), 'hex');
                
                -- Combine timestamp and random bytes
                v7uuid := encode(
                    unix_ts_ms || uuid_bytes,
                    'hex'
                )::uuid;
                
                RETURN v7uuid;
            END;
            $$ LANGUAGE plpgsql;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP FUNCTION IF EXISTS uuid_generate_v7()`);
  }
}
