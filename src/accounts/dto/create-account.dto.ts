import { ApiProperty } from "@nestjs/swagger";
import Decimal from "decimal.js";
import { AccountType } from "src/enums/AccountType";

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
