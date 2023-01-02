import { Test, TestingModule } from '@nestjs/testing';
import { UserHandler } from '../handler/user.handler';
import { UserService } from './user.service';

const UserHandlerMock = {
  validateEmail: jest.fn(),
  create: jest.fn((userToCreate) => {
    return {
      id: 1,
      ...userToCreate,
    };
  }),
  findAll: jest.fn(),
  findOneById: jest.fn(),
  findOneByEmail: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;
  let userHandlerMock: UserHandler;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserHandler, useValue: UserHandlerMock },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userHandlerMock = module.get<UserHandler>(UserHandler);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call userHandler.validateEmail', async () => {
      const userToCreate = {
        email: 'mock@mock.com',
        password: 'mock',
        name: 'mock',
      };
      const res = await service.create(userToCreate);
      expect(userHandlerMock.validateEmail).toBeCalledWith(userToCreate.email);
      expect(userHandlerMock.create).toBeCalledWith(userToCreate);
      expect(res).toEqual({
        id: 1,
        ...userToCreate,
      });
    });
  });

  describe('findAll', () => {
    it('should call userHandler.findAll', async () => {
      await service.findAll();
      expect(userHandlerMock.findAll).toBeCalled();
    });
  });

  describe('findOneById', () => {
    it('should call userHandler.findOneById', async () => {
      const id = 1;
      await service.findOneById(id);
      expect(userHandlerMock.findOneById).toBeCalledWith(id);
    });
  });

  describe('findOneByEmail', () => {
    it('should call userHandler.findOneByEmail', async () => {
      const email = 'mock@mock.com';
      await service.findOneByEmail(email);
      expect(userHandlerMock.findOneByEmail).toBeCalledWith(email);
    });
  });

  describe('update', () => {
    it('should call userHandler.update', async () => {
      const id = 1;
      const userToUpdate = {
        name: 'another name',
      };
      await service.update(id, userToUpdate);
      expect(userHandlerMock.update).toBeCalledWith(id, userToUpdate);
    });
  });

  describe('delete', () => {
    it('should call userHandler.delete', async () => {
      const id = 1;
      await service.delete(id);
      expect(userHandlerMock.delete).toBeCalledWith(id);
    });
  });
});
