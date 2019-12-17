import { Module } from '@nestjs/common';
import { UserService } from './user.service'
import { PassportModule } from '@nestjs/passport'
import { AuthStrategy } from './auth.strategy'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './model/user.entity'

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User])
  ],
  providers: [UserService, AuthStrategy],
})
export class UserModule {}
