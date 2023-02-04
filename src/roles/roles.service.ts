import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleCreation } from './roles.dto';
import { Roles } from './roles.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
  ) {}

  async createRole(dto: RoleCreation) {
    const role = await this.rolesRepository.create(dto);
    return this.rolesRepository.save(role);
  }

  async getRoleByValue(value: string) {
    const role = await this.rolesRepository.findOne({
      where: { value },
    });
    return role;
  }

  async getAllRoles() {
    return await this.rolesRepository.find();
  }
}
