import { ApiProperty } from "@nestjs/swagger";
import Decimal from "decimal.js";
import { OperationType } from "src/enums/OperationType";

export class CreateTransactionDto {
    @ApiProperty()
    operationType: OperationType;
    @ApiProperty()
    amount: Decimal;
    @ApiProperty()
    categoryId: number;
    @ApiProperty()
    accountId: number;
    @ApiProperty()
    transactionDate: Date;
}
