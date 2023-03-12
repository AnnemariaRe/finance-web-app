import { ApiProperty } from "@nestjs/swagger";
import { Category, OperationType, Transaction } from "@prisma/client";
import Decimal from "decimal.js";

export class TransactionEntity implements Transaction {
    @ApiProperty()
    id: number;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    operationType: OperationType;
    @ApiProperty()
    amount: Decimal;
    @ApiProperty()
    category: Category;
    @ApiProperty()
    accountId: number;
    @ApiProperty()
    transactionDate: Date;
}
