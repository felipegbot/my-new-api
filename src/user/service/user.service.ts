import { Injectable } from '@nestjs/common';
import { UserHandler } from '../handler/user.handler';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
@Injectable()
export class UserService {
  constructor(private userHandler: UserHandler) {}

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

  async findOneByEmail(email: string) {
    return this.userHandler.findOneByEmail(email);
  }

  async update(id: number, userToUpdate: UpdateUserDto) {
    return this.userHandler.update(id, userToUpdate);
  }

  async delete(id: number) {
    return this.userHandler.delete(id);
  }
}
