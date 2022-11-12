import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';

import { CreateUserReqDto, UpdateUserReqDto } from './user.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  list() {
    return this.userService.list();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }

  @ApiBearerAuth()
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() payload: CreateUserReqDto) {
    return this.userService.create(payload);
  }

  @ApiBearerAuth()
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserReqDto,
  ) {
    return this.userService.update(id, payload);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
