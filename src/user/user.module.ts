import { Module } from '@nestjs/common';
import { UserService } from './user.service'
import { PassportModule } from '@nestjs/passport'
import { AuthStrategy } from './auth.strategy'

@Module({
  imports: [PassportModule],
  controllers: [],
  providers: [UserService, AuthStrategy],
})
export class UserModule {}
