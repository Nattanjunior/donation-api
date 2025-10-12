import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dtos/createUser-dto';
import { z } from 'zod'
import * as bcrypt from 'bcrypt'




@Injectable()
export class AuthService {

  constructor(
    readonly prisma: PrismaService,
    readonly jwtService: JwtService,
  ) { }

  async registerUser(user: CreateUserDto) {
    const userSchema = z.object({
      name: z.string(),
      email: z.string().email(), 
      password: z.string().min(4),
    })

    const { name, email, password } = userSchema.parse(user)
    const hashedPassword = await bcrypt.hash(password, 10)
    const user
  }

}
