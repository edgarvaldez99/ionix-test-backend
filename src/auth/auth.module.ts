import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Config, CONFIG } from 'src/configuration';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [CONFIG],
      useFactory(conf: Config) {
        const { JWT_SECRET } = conf;
        return {
          secret: JWT_SECRET,
          signOptions: {
            expiresIn: '60 days',
          },
        };
      },
    }),
    PassportModule,
    UserModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
