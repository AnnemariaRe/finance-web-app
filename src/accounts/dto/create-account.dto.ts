import { ApiProperty } from "@nestjs/swagger";
import Decimal from "decimal.js";
import { Currency } from "src/currencies/entities/currency.entity";
import { AccountType } from "src/enums/AccountType";
import { User } from "src/users/entities/user.entity";

export class CreateAccountDto {
    @ApiProperty()
    user: User;
    @ApiProperty()
    title: string;
    @ApiProperty()
    balance: number;
    @ApiProperty()
    currency: Currency;
    @ApiProperty()
    accountType: AccountType;
}
