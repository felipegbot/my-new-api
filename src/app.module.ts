import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './facade/config';
@Module({
  imports: [UserModule, TypeOrmModule.forRoot(typeOrmConfig())],
})
export class AppModule {}
