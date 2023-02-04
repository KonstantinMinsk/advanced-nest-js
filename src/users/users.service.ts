import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesService } from 'src/roles/roles.service';
import { Repository } from 'typeorm';
import { UserCreation } from './user.dto';
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
    const role = await this.rolesRepository.getRoleByValue('User');
    console.log(role);

    // await user.$set('roles', [role.id]);
    return this.usersRepository.save(user);
  }

  async updateUser(id: number, dto: UserCreation) {
    const user = await this.getUser(id);
    user.email = dto.email;
    user.password = dto.password;
    return this.usersRepository.save(user);
  }

  async getAllUsers() {
    return await this.usersRepository.find();
  }

  async getUser(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  async removeUser(id: string): Promise<void> {
    await this.usersRepository.delete({ id: Number(id) });
  }
}
