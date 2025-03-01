import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    example: 'super_admin',
  })
  @IsString()
  username!: string;

  @ApiProperty({
    example: 'admin123',
  })
  password!: string;
}
