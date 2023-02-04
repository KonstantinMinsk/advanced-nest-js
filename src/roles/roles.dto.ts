import { ApiProperty } from '@nestjs/swagger';

export class RoleCreation {
  @ApiProperty({ example: 'Admin', description: 'role of user' })
  readonly value: string;

  @ApiProperty({
    example: 'Супер пользователь',
    description: 'description of user role',
  })
  readonly description: string;
}
