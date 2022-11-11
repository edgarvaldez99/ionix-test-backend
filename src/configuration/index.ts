import { ConfigType, registerAs } from '@nestjs/config';

export const config = registerAs('config', () => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: parseInt(process.env.PORT, 10),
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASS: process.env.DATABASE_PASS,
    DATABASE_PORT: parseInt(process.env.DATABASE_PORT, 10),
    DATABASE_TYPE: process.env.DATABASE_TYPE as any,
    // PICTSHARE
    PICTSHARE_API: process.env.PICTSHARE_API,
    PICTSHARE_DOCKER: process.env.PICTSHARE_DOCKER,
    PICTSHARE_PORT: parseInt(process.env.PICTSHARE_PORT, 10),
  };
});

export { default as schema } from './schema';

export const CONFIG = 'CONFIG';

export type Config = ConfigType<typeof config>;