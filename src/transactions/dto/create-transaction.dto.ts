import { ApiProperty } from "@nestjs/swagger";
import { Account } from "src/accounts/entities/account.entity";
import { Category } from "src/categories/entities/category.entity";
import { OperationType } from "src/enums/OperationType";

export class CreateTransactionDto {
    @ApiProperty()
    operationType: OperationType;
    @ApiProperty()
    amount: number;
    @ApiProperty()
    date: Date;
}
