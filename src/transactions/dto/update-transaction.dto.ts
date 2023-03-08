import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Category, OperationType } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { CreateTransactionDto } from './create-transaction.dto';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
    @ApiProperty({ required: false })
    operationType: OperationType;
    @ApiProperty({ required: false })
    amount: Decimal;
    @ApiProperty({ required: false })
    category: Category;
    @ApiProperty({ required: false })
    accountId: number;
    @ApiProperty({ required: false })
    transactionDate: Date;
}
