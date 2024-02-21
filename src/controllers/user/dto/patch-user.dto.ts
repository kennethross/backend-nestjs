import { PartialType } from '@nestjs/swagger';
import { PostUserDto } from './post-user.dto';

export class PatchUserDto extends PartialType(PostUserDto) {}
