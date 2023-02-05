import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger/dist';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guards';
import { AddRoleDto, UserCreation } from './user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Creating User' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  async createUser(@Body() userDto: UserCreation) {
    return this.usersService.createUser(userDto);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userDto: UserCreation,
  ) {
    return this.usersService.updateUser(id, userDto);
  }

  @ApiOperation({ summary: 'Getting all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('Admin')
  @UseGuards(RolesGuard)
  // @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Roles('User')
  @UseGuards(RolesGuard)
  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUser(id);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return this.usersService.removeUser(id);
  }

  @ApiOperation({ summary: 'Assign Role' })
  @ApiResponse({ status: 200 })
  @Post('/role')
  async addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }
}
