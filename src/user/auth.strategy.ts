
import { BasicStrategy } from 'passport-http'
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
export class AuthStrategy extends PassportStrategy(BasicStrategy) {
  constructor(private readonly userService: UserService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.userService.findUser(username);
    if (!user || user.password !== password) {
      throw new UnauthorizedException();
    }
    return user;
  }
}