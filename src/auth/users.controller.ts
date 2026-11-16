import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { uuidParamPipe } from '../common/uuid-param.pipe.js';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { RequirePermissions } from './decorators/permissions.decorator.js';
import { PaginationQueryDto } from './dto/pagination-query.dto.js';

@Controller('usuarios')
export class UsersController {
  constructor(private readonly users: UsersService) {}
  @Get() @RequirePermissions('users.manage') findAll(
    @Query() query: PaginationQueryDto,
  ) {
    return this.users.findAll(query);
  }
  @Get(':id') @RequirePermissions('users.manage') findOne(
    @Param('id', uuidParamPipe) id: string,
  ) {
    return this.users.findOne(id);
  }
  @Post() @RequirePermissions('users.manage') create(
    @Body() dto: CreateUserDto,
  ) {
    return this.users.create(dto);
  }
  @Put(':id') @RequirePermissions('users.manage') update(
    @Param('id', uuidParamPipe) id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.users.update(id, dto);
  }
  @Delete(':id') @RequirePermissions('users.manage') remove(
    @Param('id', uuidParamPipe) id: string,
  ) {
    return this.users.remove(id);
  }
}
