import { Injectable } from '@nestjs/common';
import { IUser } from './user.dto';

@Injectable()
export class UsersService {
  users: IUser[];

  constructor() {
    this.users = [{ id: 1, name: 'John', email: 'fdfd', password: 'fdfd654d' }];
  }

  getAllUsers() {
    return this.users;
  }
}
