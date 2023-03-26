import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrenciesService } from './currencies.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { Currency } from './entities/currency.entity';

@Controller('currencies')
@ApiTags('currency')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @ApiOperation({summary: 'Create currency'})
  @Post()
  @ApiCreatedResponse({ type: Currency })
  create(@Body() createCurrencyDto: CreateCurrencyDto) : Promise<Currency> {
    return this.currenciesService.create(createCurrencyDto);
  }

  @ApiOperation({summary: 'Get all currencies'})
  @Get()
  @ApiOkResponse({ type: Currency })
  findAll() : Promise<Currency[]> {
    return this.currenciesService.findAll();
  }

  @ApiOperation({summary: 'Get currency'})
  @Get(':id')
  @ApiOkResponse({ type: Currency })
  findOne(@Param('id') id: string) : Promise<Currency> {
    return this.currenciesService.findOne(+id);
  }
}
