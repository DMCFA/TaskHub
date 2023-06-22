import { QueryInterface } from 'sequelize';

async function createTestDatabase(
  queryInterface: QueryInterface,
  databaseName: string
) {
  const db = String(process.env.DB_TEST_NAME);
  await queryInterface.createDatabase(db);
}

export default createTestDatabase;
