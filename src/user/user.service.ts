import { Injectable } from '@nestjs/common';

const users = [
  {
    username: 'john.doe',
    password: '1234'
  },
  {
    username: 'alice',
    password: 'password'
  }
]

@Injectable()
export class UserService {
  findUser(username) {
    return users.find(u => u.username === username)
  }
}
