import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleCreation } from './roles.dto';
import { Roles } from './roles.entity';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: 'Creating Role' })
  @ApiResponse({ status: 200, type: Roles })
  @Post()
  async createRole(@Body() roleDto: RoleCreation) {
    return this.rolesService.createRole(roleDto);
  }

  @ApiOperation({ summary: 'Get Role by value' })
  @ApiResponse({ status: 200, type: Roles })
  @Get(':value')
  async getRoleByValue(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value);
  }

  @ApiOperation({ summary: 'Get all Roles' })
  @ApiResponse({ status: 200, type: [Roles] })
  @Get()
  async getAllRole() {
    return this.rolesService.getAllRoles();
  }
}
