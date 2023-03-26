import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { Currency } from './entities/currency.entity';

@Injectable()
export class CurrenciesService {
  constructor(
    @InjectRepository(Currency)
    private readonly currencyRepository: Repository<Currency>
  ) {}
    
  async create(createCurrencyDto: CreateCurrencyDto) {
    const { name, code, symbol } = createCurrencyDto;

    const currency = new Currency();
    currency.name = name;
    currency.code = code;
    currency.symbol = symbol;

    await this.currencyRepository.save(currency);
    return currency;
  }

  findAll() {
    return this.currencyRepository.find();
  }

  findOne(id: number) {
    return this.currencyRepository.findOne({ where: { id } });
  }
}
