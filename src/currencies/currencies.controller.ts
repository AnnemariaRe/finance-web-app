import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrenciesService } from './currencies.service';
import { Currency } from './entities/currency.entity';

@Controller('currencies')
@ApiTags('currency')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

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
