import { Injectable } from '@nestjs/common';
import User from 'src/facade/entities/user.model';
import jwt from 'jsonwebtoken';
import { UserService } from 'src/user/service/user.service';
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(username: string, password: string) {
    const user = await this.dataSource
      .createQueryBuilder(User, 'user')
      .where('email = :email', { email: username })
      .andWhere('is_active = true')
      .getOne();
    if (!user) throw new Error('unauthorized');
    if (!user.verifyPassword(password)) {
      throw new Error('unauthorized');
    }

    const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.JWT_SECRET ?? '',
      {
        expiresIn: '30d',
      },
    );

    return { user, token };
  }
}
