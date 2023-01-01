import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AbstractAuthService } from 'src/abstracts/abstract-auth.service';
import User from 'src/facade/entities/user.model';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class AuthService implements AbstractAuthService<User> {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneByEmail(username);
    if (!user) throw new NotFoundException('Conta não encontrada');

    if (!(await user.verifyPassword(password)))
      throw new UnauthorizedException('Credenciais inválidas');

    const { password_hash, ...rest } = user;

    return rest;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
