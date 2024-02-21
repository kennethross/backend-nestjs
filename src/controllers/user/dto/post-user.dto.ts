import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PostUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  lastName!: string;

  @ApiProperty()
  @IsString()
  username!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsOptional()
  password!: string;

  @ApiProperty()
  @IsOptional()
  role!: string;
}
