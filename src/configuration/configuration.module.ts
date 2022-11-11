import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { enviroments } from 'src/environments';
import { CONFIG, Config, config, schema } from './';
import { getEnvPath } from './utils';

const envFileName = enviroments[process.env.NODE_ENV] || '.env';
const envFilePath = getEnvPath(envFileName);

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      load: [config],
      isGlobal: true,
      validationSchema: schema,
    }),
  ],
  providers: [
    {
      provide: CONFIG,
      inject: [config.KEY],
      useFactory: (conf: Config) => conf,
    },
  ],
  exports: [CONFIG],
})
export class ConfigurationModule {}
