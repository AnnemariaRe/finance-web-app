import { ApiProperty } from "@nestjs/swagger";
import { AccountType, Prisma } from "@prisma/client";
import Decimal from "decimal.js";

export class CreateAccountDto {
    @ApiProperty()
    userId: number;
    @ApiProperty()
    title: string;
    @ApiProperty()
    balance: Decimal;
    @ApiProperty()
    currency: string;
    @ApiProperty()
    accountType: AccountType;
}
