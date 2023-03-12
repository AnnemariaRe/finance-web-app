import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@Controller('users')
@ApiTags('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({summary: 'Create user'})
  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto) : Promise<UserEntity> {
    return await this.usersService.create(createUserDto);
  }

  @ApiOperation({summary: 'Get all users'})
  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll() : Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @ApiOperation({summary: 'Get user'})
  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('id') id: string) : Promise<UserEntity> {
    return await this.usersService.findOne(+id);
  }

  @ApiOperation({summary: 'Edit user info'})
  @Patch(':id')
  @ApiOkResponse({ type: UserEntity })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) : Promise<UserEntity> {
    return await this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({summary: 'Delete user'})
  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}

