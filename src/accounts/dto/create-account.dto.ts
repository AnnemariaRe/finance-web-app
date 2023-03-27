import { ApiProperty } from "@nestjs/swagger";
import { Currency } from "src/currencies/entities/currency.entity";
import { AccountType } from "src/enums/AccountType";
import { User } from "src/users/entities/user.entity";

export class CreateAccountDto {
    @ApiProperty()
    title: string;
    @ApiProperty()
    balance: number;
    @ApiProperty()
    accountType: AccountType;
}
