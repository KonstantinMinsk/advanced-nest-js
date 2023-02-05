import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/roles/roles.entity';
import { RolesService } from 'src/roles/roles.service';
import { Repository } from 'typeorm';
import { AddRoleDto, UserCreation } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private rolesRepository: RolesService,
  ) {}

  async createUser(dto: UserCreation) {
    const user = await this.usersRepository.create(dto);
    // const isRole = await this.rolesRepository.createRole({
    //   value: 'User',
    //   description: 'Simple User without credentials',
    // });
    const isRole = await this.rolesRepository.getRoleByValue('User');

    // console.log(isRole);
    // await user.$set('roles', [role.id]);
    // user.roles = [role];

    const role = new Roles();
    role.value = 'User';
    role.description = 'Simple User without credentials';

    user.roles = [role];

    return this.usersRepository.save(user);
  }

  async updateUser(id: number, dto: UserCreation) {
    const user = await this.getUser(id);
    user.email = dto.email;
    user.password = dto.password;
    return this.usersRepository.save(user);
  }

  async getAllUsers() {
    return await this.usersRepository.find({
      // join: { alias: 'roles' },
      // include: { all: true },
      // relations: { roles: true },
    });
  }

  async getUser(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    // return this.usersRepository.findOne({
    //   where: {
    //     email,
    //   },
    // include: { all: true },
    // });
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async removeUser(id: string): Promise<void> {
    await this.usersRepository.delete({ id: Number(id) });
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.usersRepository.findOne({
      where: { id: dto.userId },
    });
    const role = await this.rolesRepository.getRoleByValue(dto.value);

    if (user && role) {
      // await user.$add('roles', [role]);
      return dto;
    }

    throw new HttpException(
      'The user or role was not found',
      HttpStatus.NOT_FOUND,
    );
  }
}
