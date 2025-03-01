import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(8)
  username: string;

  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  // @IsStrongPassword({
  //   minLength: 1,
  // })
  password!: string;

  @ApiProperty()
  firstName!: string;

  @ApiProperty()
  lastName!: string;
}
