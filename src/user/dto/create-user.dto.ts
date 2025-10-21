import { IsString, IsEmail, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { Roles } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsBoolean()
  @IsOptional()
  emailVerified?: boolean;

  @IsString()
  @IsOptional()
  authProvider?: string;

  @IsString()
  @IsOptional()
  providerId?: string;

  @IsEnum(Roles)
  @IsOptional()
  role?: Roles;
}
