import { ApiProperty, PartialType } from '@nestjs/swagger';
import { AccountType, Prisma } from '@prisma/client';
import { CreateAccountDto } from './create-account.dto';

export class UpdateAccountDto extends PartialType(CreateAccountDto) {
    @ApiProperty({ required: false })
    title: string;
    @ApiProperty({ required: false })
    balance: Prisma.Decimal;
    @ApiProperty({ required: false })
    isActive: boolean;
    @ApiProperty({ required: false })
    currency: string;
    @ApiProperty({ required: false })
    accountType: AccountType;
}
