import { Test, TestingModule } from '@nestjs/testing';
import {
  UserRepositoryMock,
  userRepositoryMockProvider,
} from './test/user.repository.mock';
import { userStub } from './test/user.stub';
import { UserController } from './user.controller';
import { CreateUserReqDto, UpdateUserReqDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  describe('find operators', () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [UserController],
        providers: [UserService, userRepositoryMockProvider],
      }).compile();

      controller = module.get<UserController>(UserController);
      service = module.get<UserService>(UserService);

      jest.clearAllMocks();
    });

    describe('list', () => {
      describe('when list is called', () => {
        let list: User[];

        beforeEach(async () => {
          jest.spyOn(service, 'list');
          list = await controller.list();
        });

        test('then it should call service.list', () => {
          expect(service.list).toHaveBeenCalled();
        });

        test('then it should return user list', () => {
          expect(list).toEqual([userStub()]);
        });
      });
    });

    describe('getById', () => {
      describe('when getById is called', () => {
        let obj: User;

        beforeEach(async () => {
          jest.spyOn(service, 'findById');
          obj = await controller.get(userStub().id);
        });

        test('then it should call service.findById', () => {
          expect(service.findById).toBeCalledWith(userStub().id);
        });

        test('then is should return a user', () => {
          expect(obj).toEqual(userStub());
        });
      });
    });

    describe('update', () => {
      describe('when update is called', () => {
        let obj: User;
        let updateDto: UpdateUserReqDto;

        beforeEach(async () => {
          jest.spyOn(service, 'update');
          updateDto = {
            firstname: userStub().firstname,
            lastname: userStub().lastname,
          };
          obj = await controller.update(userStub().id, updateDto);
        });

        test('then it should call service.update', () => {
          expect(service.update).toBeCalledWith(userStub().id, updateDto);
        });

        test('then is should return a user', () => {
          expect(obj).toEqual(userStub());
        });
      });
    });

    describe('delete', () => {
      describe('when delete is called', () => {
        let obj: User;

        beforeEach(async () => {
          jest.spyOn(service, 'remove');
          const deleteResult = await controller.remove(userStub().id);
          obj = deleteResult.raw;
        });

        test('then it should call service.remove', () => {
          expect(service.remove).toBeCalledWith(userStub().id);
        });

        test('then is should return a user', () => {
          expect(obj).toEqual(userStub());
        });
      });
    });
  });

  describe('create operators', () => {
    beforeEach(async () => {
      const module = await Test.createTestingModule({
        controllers: [UserController],
        providers: [UserService, userRepositoryMockProvider],
      }).compile();

      controller = module.get<UserController>(UserController);
      service = module.get<UserService>(UserService);
    });

    describe('create', () => {
      describe('when create is called', () => {
        let obj: User;
        let saveSpy: jest.SpyInstance;
        let createDto: CreateUserReqDto;

        beforeEach(async () => {
          saveSpy = jest.spyOn(UserRepositoryMock.prototype, 'save');
          jest.spyOn(service, 'create');
          createDto = {
            firstname: userStub().firstname,
            lastname: userStub().lastname,
            email: userStub().email,
            username: userStub().username,
            password: userStub().password,
          };
          obj = await controller.create(createDto);
        });

        test('then it should call service.create', () => {
          expect(service.create).toHaveBeenCalledWith(createDto);
        });

        test('then it should call the userModel', () => {
          expect(saveSpy).toHaveBeenCalled();
        });

        test('then it should return a user', () => {
          const user = {
            ...userStub(),
            password: '', // the password is removed due to encryption
          };
          const objWithoutPass = {
            ...obj,
            password: '', // the password is removed due to encryption
          };
          expect(objWithoutPass).toEqual(user);
        });
      });
    });
  });
});
