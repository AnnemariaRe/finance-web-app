import { ApiProperty, PartialType } from '@nestjs/swagger';
import Decimal from 'decimal.js';
import { AccountType } from 'src/enums/AccountType';
import { CreateAccountDto } from './create-account.dto';

export class UpdateAccountDto extends PartialType(CreateAccountDto) {
    @ApiProperty({ required: false })
    title: string;
    @ApiProperty({ required: false })
    balance: Decimal;
    @ApiProperty({ required: false })
    isActive: boolean;
    @ApiProperty({ required: false })
    currency: string;
    @ApiProperty({ required: false })
    accountType: AccountType;
}
