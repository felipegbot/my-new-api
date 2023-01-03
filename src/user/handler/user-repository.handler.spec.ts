import { Repository } from 'typeorm';
import User from '../user.model';
import { UserRepositoryHandler } from './user-repositoy.handler';

describe('UserRepositoryHandler', () => {
  let userRepositoryHandler: UserRepositoryHandler;

  const mockRepositoryUser = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    findOneById: jest.fn(),
    findOneByEmail: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    userRepositoryHandler = new UserRepositoryHandler(mockRepositoryUser as unknown as Repository<User>);
  });

  it('should be defined', () => {
    expect(userRepositoryHandler).toBeDefined();
  });

  describe('create', () => {
    it('should call userRepositoryHandler.create', async () => {
      const userToSave = new User();
      userToSave.email = 'mock@mock.com';
      userToSave.name = 'new name';
      userToSave.id = 1;
      userToSave.password_hash = 'password_hash';
      await userRepositoryHandler.create(userToSave);
      expect(mockRepositoryUser.save).toBeCalledWith(userToSave);
    });
  });

  describe('update', () => {
    it('should call userRepositoryHandler.update', async () => {
      const userToUpdate = {
        name: 'another name',
      };
      const id = 1;
      await userRepositoryHandler.update(id, userToUpdate);

      expect(mockRepositoryUser.update).toBeCalledWith(id, userToUpdate);
    });
  });
});
