import { User } from '../user.entity';

export const userStub = (): User => {
  return {
    id: 10,
    firstname: 'Shir',
    lastname: 'McIlreavy',
    email: 'smcilreavy0@google.com',
    username: 'smcilreavy0',
    password: '6wQbQv27uO',
    avatar: null,
    createAt: new Date('2022-11-12T08:03:27.646Z'),
    updateAt: new Date('2022-11-12T08:03:27.646Z'),
  };
};
