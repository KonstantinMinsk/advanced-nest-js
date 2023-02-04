import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserRoles {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  roleId: number;

  @Column()
  userId: number;
}
