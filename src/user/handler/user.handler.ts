import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import bcrypt from 'bcrypt';
import { UserRepositoryHandler } from './user-repositoy.handler';
import { UpdateUserDto } from '../dto/update-user.dto';
import User from '../user.model';
@Injectable()
export class UserHandler {
  constructor(private userRepositoryHandler: UserRepositoryHandler) {}

  async create(userToCreate: CreateUserDto) {
    const newUser = new User();
    newUser.name = userToCreate.name;
    newUser.email = userToCreate.email;

    newUser.password_hash = this.generatePasswordHash(userToCreate.password);

    return this.userRepositoryHandler.create(newUser);
  }

  async findAll() {
    return this.userRepositoryHandler.findAll();
  }

  async findOneById(id: number) {
    return this.userRepositoryHandler.findOneById(id);
  }

  async findOneByEmail(email: string) {
    return this.userRepositoryHandler.findOneByEmail(email);
  }

  async update(id: number, userToUpdate: UpdateUserDto) {
    const user = await this.userRepositoryHandler.findOneById(id);
    userToUpdate = { ...user, ...userToUpdate };
    return this.userRepositoryHandler.update(id, userToUpdate);
  }

  async delete(id: number) {
    return this.userRepositoryHandler.delete(id);
  }

  async validateEmail(email: string) {
    const user = await this.userRepositoryHandler.findOneByEmail(email);
    if (user) {
      throw new Error('Email already exists');
    }
  }

  generatePasswordHash(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }
}
