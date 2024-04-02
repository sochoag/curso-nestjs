import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: string;

  @IsNotEmpty()
  readonly role: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
