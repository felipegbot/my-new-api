import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { ValidateIdMiddleware } from './middleware/user.middleware';
import { AuthModule } from 'src/auth/auth.module';
import { UserServiceModule } from './service/user.service.module';
@Module({
  imports: [AuthModule, UserServiceModule],
  controllers: [UserController],
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
