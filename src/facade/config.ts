import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

export const typeOrmConfig = (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    autoLoadEntities: true,
  };
};
