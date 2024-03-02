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
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetUserEntity } from './entities/get-user';
import { PostUserDto } from './dto/post-user.dto';
import { validate } from 'class-validator';
import { PatchUserDto } from './dto/patch-user.dto';
import { ValidateResultExistence } from 'src/shared/decorators/validate-result-existence.decorators';
import { JwtAuthGuard } from 'src/shared/guard/jwt.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({
    type: GetUserEntity,
  })
  @UseGuards(JwtAuthGuard)
  getUsers() {
    return this.userService.getAll();
  }

  @Get(':userId')
  @ValidateResultExistence()
  @UseGuards(JwtAuthGuard)
  getUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.getOne({ userId });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async postUser(@Body() payload: PostUserDto) {
    await validate(PostUserDto, {
      whitelist: true,
    });
    return this.userService.create(payload);
  }

  @Patch(':userId')
  @ApiNoContentResponse()
  @UseGuards(JwtAuthGuard)
  patchUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() payload: PatchUserDto,
  ) {
    this.userService.update({ id: userId, payload });
  }

  @Delete(':userId')
  @ApiNoContentResponse()
  @UseGuards(JwtAuthGuard)
  deleteUsers(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.delete(userId);
  }
}
