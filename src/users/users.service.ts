import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreation } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(dto: UserCreation) {
    const user = await this.usersRepository.create(dto);
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
