import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetUserEntity } from './entities/get-user';
import { PostUserDto } from './dto/post-user.dto';
import { validate } from 'class-validator';
import { PatchUserDto } from './dto/patch-user.dto';
import { ValidateResultExistence } from 'src/decorators/validate-result-existence.decorators';

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
  @ValidateResultExistence()
  getUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.getOne({ userId });
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
  patchUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() payload: PatchUserDto,
  ) {
    this.userService.update({ id: userId, payload });
  }

  @Delete(':userId')
  @ApiNoContentResponse()
  deleteUsers(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.delete(userId);
  }
}
