import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './facade/config';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/service/user.service';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [UserModule, AuthModule, TypeOrmModule.forRoot(typeOrmConfig())],
  providers: [
    {
      provide: 'AbstractAuthService',
      useClass: AuthService,
    },
    {
      provide: 'AbstractUserService',
      useClass: UserService,
    },
    JwtService,
  ],
  exports: [JwtService],
})
export class AppModule {}
