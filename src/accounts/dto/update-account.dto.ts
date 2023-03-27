import { ApiProperty, PartialType } from '@nestjs/swagger';
import Decimal from 'decimal.js';
import { Currency } from 'src/currencies/entities/currency.entity';
import { AccountType } from 'src/enums/AccountType';
import { CreateAccountDto } from './create-account.dto';

export class UpdateAccountDto extends PartialType(CreateAccountDto) {
    @ApiProperty({ required: false })
    title: string;
    @ApiProperty({ required: false })
    isActive: boolean;
    @ApiProperty({ required: false })
    accountType: AccountType;
}
