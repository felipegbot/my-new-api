import { Injectable } from '@nestjs/common';
import { UserHandler } from '../handler/user.handler';
import { UserRepositoryHandler } from '../handler/user-repositoy.handler';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
@Injectable()
export class UserService {
  constructor(
    private userHandler: UserHandler,
    private userRepositoryHandler: UserRepositoryHandler,
  ) {}

  async create(userToCreate: CreateUserDto) {
    await this.userHandler.validateEmail(userToCreate.email);
    return this.userHandler.create(userToCreate);
  }

  async findAll() {
    return this.userHandler.findAll();
  }

  async findOneById(id: number) {
    return this.userHandler.findOneById(id);
  }

  async update(id: number, userToUpdate: UpdateUserDto) {
    return this.userHandler.update(id, userToUpdate);
  }

  async delete(id: number) {
    return this.userRepositoryHandler.delete(id);
  }
}
