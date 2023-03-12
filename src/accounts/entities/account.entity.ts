import { ApiProperty } from "@nestjs/swagger";
import { Account, AccountType, Prisma } from "@prisma/client";
import Decimal from "decimal.js";

export class AccountEntity implements Account {
    @ApiProperty()
    id: number;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    userId: number;
    @ApiProperty()
    title: string;
    @ApiProperty()
    balance: Decimal;
    @ApiProperty()
    isActive: boolean;
    @ApiProperty()
    currency: string;
    @ApiProperty()
    accountType: AccountType;
}
