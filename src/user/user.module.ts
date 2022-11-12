import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PassportModule } from '@nestjs/passport';
import { UserSeedService } from './seeds/user.seed.service';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UserSeedService, UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {
  constructor(userSeedService: UserSeedService) {
    userSeedService.insertUserBatchIfNotExists();
  }
}
