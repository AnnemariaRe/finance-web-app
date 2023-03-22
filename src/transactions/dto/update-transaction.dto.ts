import { ApiProperty, PartialType } from '@nestjs/swagger';
import Decimal from "decimal.js";
import { OperationType } from 'src/enums/OperationType';
import { CreateTransactionDto } from './create-transaction.dto';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
    @ApiProperty({ required: false })
    operationType: OperationType;
    @ApiProperty({ required: false })
    amount: Decimal;
    @ApiProperty({ required: false })
    categoryId: number;
    @ApiProperty({ required: false })
    accountId: number;
    @ApiProperty({ required: false })
    transactionDate: Date;
}
