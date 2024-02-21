import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetUserEntity } from './entities/get-user';
import { PostUserDto } from './dto/post-user.dto';
import { validate } from 'class-validator';
import { PatchUserDto } from './dto/patch-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({
    type: GetUserEntity,
  })
  getUsers() {
    return this.userService.getAll();
  }

  @Get(':userId')
  getUser() {
    return this.userService.getAll();
  }

  @Post()
  async postUser(@Body() payload: PostUserDto) {
    await validate(PostUserDto, {
      whitelist: true,
    });
    return this.userService.create(payload);
  }

  @Patch(':userId')
  @ApiNoContentResponse()
  @HttpCode(204)
  patchUser(@Param('userId') userId: number, @Body() payload: PatchUserDto) {
    this.userService.update({ id: +userId, payload });
  }

  @Delete(':userId')
  @ApiNoContentResponse()
  @HttpCode(204)
  deleteUsers(@Param('userId') userId: number) {
    return this.userService.delete(+userId);
  }
}
