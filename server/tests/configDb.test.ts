import { Dialect } from 'sequelize';

export default {
  database: process.env.DB_TEST_NAME || '',
  username: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  host: process.env.DB_HOST || '',
  port: parseInt(process.env.DB_PORT || '0', 10),
  dialect: 'postgres' as Dialect,
  logging: false,
};
