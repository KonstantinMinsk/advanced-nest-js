import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserCreation } from 'src/users/user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: UserCreation) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: UserCreation) {
    const userExist = await this.userService.getUserByEmail(userDto.email);
    if (userExist) {
      throw new HttpException(
        'User with this email already registered',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: UserCreation) {
    const user = await this.userService.getUserByEmail(userDto.email);
    let passwordEquals;

    if (user) {
      passwordEquals = await bcrypt.compare(userDto.password, user.password);
    }

    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({ message: 'Invalid user or password' });
  }
}
