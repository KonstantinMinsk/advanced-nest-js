import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ example: 10, description: 'unique ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Dodo', description: 'name of user' })
  @Column({ nullable: true })
  name: string;

  @ApiProperty({ example: 'test@mail.ru', description: 'email of user' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'gdg!55', description: 'password' })
  @Column()
  password: string;

  @ApiProperty({ example: false, description: 'Has the user been blocked?' })
  @Column({ default: false })
  blocked: boolean;
}
