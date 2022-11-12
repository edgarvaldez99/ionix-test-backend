import { getRepositoryToken } from '@nestjs/typeorm';
import { RepositoryMock } from 'src/database/test/repository.mock';
import { User } from '../user.entity';
import { userStub } from './user.stub';

export class UserRepositoryMock extends RepositoryMock<User> {
  protected entityStub = userStub();
}

export const userRepositoryMockProvider = {
  provide: getRepositoryToken(User),
  useClass: UserRepositoryMock,
};
