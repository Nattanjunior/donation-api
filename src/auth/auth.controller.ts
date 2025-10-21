import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import type { LoginUserDto } from './dtos/login-user.dto';
import type { CreateUserDto } from './dtos/createUser-dto';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@Controller('auth')
export class AuthController {

  constructor(readonly authService: AuthService) { }

  @Post('register') registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto)
  }

  @Post('login') loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto)
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() { }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Req() req) {
    return this.authService.loginWithGoogle(req.user)
  }
}
