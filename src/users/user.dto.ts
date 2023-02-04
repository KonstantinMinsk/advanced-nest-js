import { ApiProperty } from '@nestjs/swagger';

class UserCreation {
  @ApiProperty({ example: 'test@mail.ru', description: 'email of user' })
  readonly email: string;

  @ApiProperty({ example: 'gdg!55', description: 'password' })
  readonly password: string;
}

interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

export { UserCreation, IUser };
