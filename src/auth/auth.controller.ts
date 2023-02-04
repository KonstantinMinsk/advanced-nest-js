import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserCreation } from 'src/users/user.dto';
import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, type: User })
  @Post('/login')
  async login(@Body() userDto: UserCreation) {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'Registration' })
  @ApiResponse({ status: 200 })
  @Post('/reg')
  async registration(@Body() userDto: UserCreation) {
    return this.authService.registration(userDto);
  }
}
