import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/facade/entities/user.model';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '../dto/update-user.dto';
@Injectable()
export class UserRepositoryHandler {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(user: User) {
    const newUser = await this.userRepository.save(user);
    return newUser;
  }

  async findAll() {
    const users: User[] = await this.userRepository.find();
    return users;
  }

  async findOneById(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email: email } });
    return user;
  }

  async update(id: number, user: UpdateUserDto) {
    const updatedUser = await this.userRepository.update(id, user);
    return updatedUser;
  }

  async delete(id: number) {
    const deletedUser = await this.userRepository.delete(id);
    return { ok: true };
  }
}
