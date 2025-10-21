import { Body, Controller, Post } from '@nestjs/common';
import type { LoginUserDto } from './dtos/login-user.dto';
import type { CreateUserDto } from './dtos/createUser-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(readonly authService: AuthService) { }

  @Post('register') registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto)
  }

  @Post('login') loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto)
  }
}
