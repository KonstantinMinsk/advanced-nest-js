import { Controller, Get } from '@nestjs/common';
import { IUser } from './user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(): IUser[] {
    return this.usersService.getAllUsers();
  }
}
