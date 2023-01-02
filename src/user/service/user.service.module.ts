import { Module } from '@nestjs/common';
import { UserRepositoryHandler } from '../handler/user-repositoy.handler';
import { UserHandler } from '../handler/user.handler';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/user/user.model';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserRepositoryHandler, UserHandler],
  exports: [UserService],
})
export class UserServiceModule {}
