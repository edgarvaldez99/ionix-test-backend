import { Inject, Injectable } from '@nestjs/common';
import { Config, CONFIG } from 'src/configuration';
import { CreateUserReqDto } from '../user.dto';
import { UserService } from '../user.service';

import { userSeedList } from './user.seed';

@Injectable()
export class UserSeedService {
  constructor(
    @Inject(CONFIG) private readonly conf: Config,
    private readonly userService: UserService,
  ) {}

  async insertUserBatchIfNotExists() {
    const userList = await this.userService.list();
    if (userList.length) return;
    this.insertUserAdminIfNotExists();
    this.insertUserBatch(userSeedList);
  }

  private async insertUserBatch(userList: CreateUserReqDto[]) {
    for (const createUserReqDto of userList) {
      await this.userService.create(createUserReqDto);
    }
  }

  private async insertUserAdminIfNotExists() {
    const username = this.conf.ADMIN_USER;
    const userAdmin = await this.userService.findByUsername(username);
    if (userAdmin) return;
    const userAdminDto: CreateUserReqDto = {
      firstname: 'User',
      lastname: 'Admin',
      username,
      password: this.conf.ADMIN_PASS,
    };
    this.userService.create(userAdminDto);
  }
}
