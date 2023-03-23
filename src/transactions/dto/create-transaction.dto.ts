import { ApiProperty } from "@nestjs/swagger";
import Decimal from "decimal.js";
import { Account } from "src/accounts/entities/account.entity";
import { Category } from "src/categories/entities/category.entity";
import { OperationType } from "src/enums/OperationType";

export class CreateTransactionDto {
    @ApiProperty()
    operationType: OperationType;
    @ApiProperty()
    amount: number;
    @ApiProperty()
    category: Category;
    @ApiProperty()
    account: Account;
    @ApiProperty()
    date: Date;
}
