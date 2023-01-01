import User from 'src/facade/entities/user.model';

export abstract class AbstractUserService {
  abstract findOneByEmail(email: string): Promise<User>;
  abstract create(user: User): Promise<User>;
  abstract update(id: number, user: User): Promise<User>;
  abstract delete(id: number): Promise<User>;
}
