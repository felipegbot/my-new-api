import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/facade/entities/user.model';
import { UserRepositoryHandler } from './handler/user-repositoy.handler';
import { UserHandler } from './handler/user.handler';
import { ValidateIdMiddleware } from './middleware/user.middleware';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepositoryHandler,
    UserHandler,
    AuthService,
    JwtService,
  ],
  exports: [UserService, UserRepositoryHandler, UserHandler],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateIdMiddleware)
      .forRoutes(
        { path: 'user/:id', method: RequestMethod.PUT },
        { path: 'user/:id', method: RequestMethod.DELETE },
      );
  }
}
