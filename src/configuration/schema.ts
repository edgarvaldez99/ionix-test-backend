import * as Joi from 'joi';

const dbTypeOptions = [
  'mysql',
  'mariadb',
  'postgres',
  'cockroachdb',
  'sqlite',
  'mssql',
  'oracle',
  'sqljs',
  'aurora-mysql',
  'aurora-postgres',
  'better-sqlite3',
] as const;

export default Joi.object({
  NODE_ENV: Joi.string().valid('dev', 'prod', 'test').required(),
  PORT: Joi.number().required(),
  // DATABASE
  DATABASE_HOST: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASS: Joi.string().required(),
  DATABASE_PORT: Joi.number().optional(),
  DATABASE_TYPE: Joi.string()
    .valid(...dbTypeOptions)
    .required(),
  // PICTSHARE
  PICTSHARE_DOCKER: Joi.string().required(),
  PICTSHARE_API: Joi.string().required(),
  PICTSHARE_PORT: Joi.number().optional(),
});
