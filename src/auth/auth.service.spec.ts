import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/service/user.service';
import User from '../user/user.model';
import { AuthService } from './auth.service';
describe('AuthService', () => {
  let authService: AuthService;

  const mockUser = {
    id: 1,
    name: 'mock',
    email: 'mock@mock.com',
    password_hash: 'mockpassword',
  };

  const mockUserService = {
    findOneByEmail: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn((payload) => payload),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, { provide: UserService, useValue: mockUserService }, { provide: JwtService, useValue: mockJwtService }],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('should call jwtService.sign', async () => {
      const newMockUser = new User();
      newMockUser.id = 1;
      newMockUser.email = mockUser.email;
      newMockUser.password_hash = mockUser.password_hash;

      await authService.login(newMockUser);

      expect(mockJwtService.sign).toHaveBeenCalledWith({ sub: newMockUser.id, email: newMockUser.email });
    });
  });
});
