import { ApiProperty } from "@nestjs/swagger";
import { Category, OperationType } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";

export class CreateTransactionDto {
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
