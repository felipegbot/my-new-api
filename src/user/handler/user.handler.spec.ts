import { Test, TestingModule } from '@nestjs/testing';

import { UserRepositoryHandler } from './user-repositoy.handler';
import { UserHandler } from './user.handler';

describe('UserHandler', () => {
  let userHandler: UserHandler;

  const mockUser = {
    name: 'mock',
    email: 'mock@mock.com',
  };

  const mockUserRepositoryHandler = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOneById: jest.fn(
      () =>
        new Promise((resolve) => {
          resolve(mockUser);
        }),
    ),
    findOneByEmail: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserHandler, { provide: UserRepositoryHandler, useValue: mockUserRepositoryHandler }],
    }).compile();

    userHandler = module.get<UserHandler>(UserHandler);
  });

  it('should be defined', () => {
    expect(userHandler).toBeDefined();
  });

  describe('create', () => {
    it('should call userRepositoryHandler.create', async () => {
      const userToCreate = {
        email: 'mockemail@mock.com',
        name: 'mock',
        password: 'mock',
      };
      await userHandler.create(userToCreate);
      const { password, ...user } = userToCreate;
      expect(mockUserRepositoryHandler.create).toBeCalledWith({
        ...user,
        password_hash: expect.any(String),
      });
    });
  });

  describe('update', () => {
    it('should call userRepositoryHandler.update', async () => {
      const userToUpdate = {
        name: 'another name',
      };
      const id = 1;
      await userHandler.update(id, userToUpdate);

      expect(mockUserRepositoryHandler.findOneById).toBeCalledWith(id);
      expect(mockUserRepositoryHandler.update).toBeCalledWith(id, { ...mockUser, ...userToUpdate });
    });
  });
});
