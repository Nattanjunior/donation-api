import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dtos/createUser-dto';
import { z } from 'zod'
import * as bcrypt from 'bcrypt'
import type { LoginUserDto } from './dtos/login-user.dto';

@Injectable()
export class AuthService {

  constructor(
    readonly prisma: PrismaService,
    readonly jwtService: JwtService,
  ) { }

  async registerUser(createUserDto: CreateUserDto) {
    const userSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(4),
    })

    const { name, email, password } = userSchema.parse(createUserDto)
    const hashedPassword = await bcrypt.hash(password, 10)
    const createdUser = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      },
    })
    return { message: "User created successfully", createdUser }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const userSchema = z.object({
      email: z.string().email(),
      password: z.string().min(4),
    })

    const { email, password } = userSchema.parse(loginUserDto)
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { email }
    })

    if (!user) {
      throw new UnauthorizedException("Invalid credentials")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials")
    }
    return { message: "User logged in successfully", user }
  }

}
