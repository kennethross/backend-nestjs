import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';

export class SignInDto {
  @ApiProperty()
  @IsString()
  username!: string;

  @ApiProperty()
  @IsStrongPassword()
  password!: string;
}
