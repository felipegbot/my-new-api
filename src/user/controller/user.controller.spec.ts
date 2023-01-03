import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../service/user.service';
import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOneById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
  const mockAuthService = { login: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST on /auth', () => {
    it('should call authService.login', () => {
      const mockUser = { id: 1, email: 'mockemail@mock.com' };
      const req = { user: mockUser };
      controller.authenticate(req);
      expect(mockAuthService.login).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('POST on /', () => {
    it('should call userService.create', () => {
      const mockUser = { name: 'new name', email: 'mockemail@mock.com', password: 'mockpassword' };
      controller.create(mockUser);
      expect(mockUserService.create).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('GET on /', () => {
    it('should call userService.findAll', () => {
      controller.findAll();
      expect(mockUserService.findAll).toHaveBeenCalled();
    });
  });

  describe('GET on /:id', () => {
    it('should call userService.findOneById', () => {
      const mockId = 1;
      controller.findOne(mockId.toString());
      expect(mockUserService.findOneById).toHaveBeenCalledWith(mockId);
    });
  });

  describe('PUT on /:id', () => {
    it('should call userService.update', () => {
      const mockId = 1;
      const mockUser = { name: 'another new name' };
      controller.update(mockId.toString(), mockUser);
      expect(mockUserService.update).toHaveBeenCalledWith(mockId, mockUser);
    });
  });

  describe('DELETE on /:id', () => {
    it('should call userService.delete', () => {
      const mockId = 1;
      controller.remove(mockId.toString());
      expect(mockUserService.delete).toHaveBeenCalledWith(mockId);
    });
  });
});
