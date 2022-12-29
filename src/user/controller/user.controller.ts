import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import User from 'src/facade/entities/user.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('user')
export class UserController {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersRepository.createQueryBuilder('User').getMany();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersRepository.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersRepository.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersRepository.remove(+id);
  // }
}
