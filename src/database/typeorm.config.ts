import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from 'dotenv';

dotenv.config();

export const  dataSourceOptions: DataSourceOptions = ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  entities: ['dist/**/entities/*.entity.js'],
  migrations:['dist/database/migrations/**/*.js'],
  logging: true
});

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;