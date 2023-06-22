import { Sequelize } from 'sequelize';
import testConfig from '../tests/configDb.test';

const sequelize = new Sequelize(
  testConfig.database,
  testConfig.username,
  testConfig.password,
  {
    host: testConfig.host,
    port: testConfig.port,
    dialect: testConfig.dialect,
    logging: testConfig.logging,
  }
);

async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testDatabaseConnection();

export default sequelize;
