import { Injectable } from '@nestjs/common';

@Injectable()
export class UserServiceMock {
  findUser() {
    return {
      username: 'foo',
      password: 'bar',
    }
  }

  static createToken(username: string, password: string) {
    return Buffer.from('foo:bar').toString('base64')
  }
}
