import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Roles {
  @ApiProperty({ example: 14, description: 'unique ID' })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({ example: 'Manager', description: 'role of user' })
  @Column()
  value: string;

  @ApiProperty({
    example: 'Head of management department',
    description: 'Description the role',
  })
  @Column()
  description: string;

  @ManyToMany(() => User, (user) => user.roles)
  @JoinColumn()
  users: User[];
}
