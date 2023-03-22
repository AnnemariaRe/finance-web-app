import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('users')
@ApiTags('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({summary: 'Create user'})
  @Post()
  @ApiCreatedResponse({ type: User })
  async create(@Body() createUserDto: CreateUserDto) : Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @ApiOperation({summary: 'Get all users'})
  @Get()
  @ApiOkResponse({ type: User, isArray: true })
  async findAll() : Promise<User[]> {
    return await this.usersService.findAll();
  }

  @ApiOperation({summary: 'Get user'})
  @Get(':id')
  @ApiOkResponse({ type: User })
  async findOne(@Param('id') id: string) : Promise<User> {
    return await this.usersService.findOne(+id);
  }

  @ApiOperation({summary: 'Edit user info'})
  @Patch(':id')
  @ApiOkResponse({ type: User })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) : Promise<User> {
    return await this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({summary: 'Delete user'})
  @Delete(':id')
  @ApiOkResponse({ type: User })
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}

