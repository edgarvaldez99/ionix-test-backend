import { Global, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CONFIG, Config } from 'src/configuration';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [CONFIG],
      useFactory: (conf: Config): TypeOrmModuleOptions => ({
        type: conf.DATABASE_TYPE,
        host: conf.DATABASE_HOST,
        port: conf.DATABASE_PORT,
        username: conf.DATABASE_USER,
        password: conf.DATABASE_PASS,
        database: conf.DATABASE_NAME,
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
