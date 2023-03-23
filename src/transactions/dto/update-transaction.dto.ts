import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Account } from 'src/accounts/entities/account.entity';
import { Category } from 'src/categories/entities/category.entity';
import { OperationType } from 'src/enums/OperationType';
import { CreateTransactionDto } from './create-transaction.dto';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
    @ApiProperty({ required: false })
    operationType: OperationType;
    @ApiProperty({ required: false })
    amount: number;
    @ApiProperty({ required: false })
    category: Category;
    @ApiProperty({ required: false })
    account: Account;
    @ApiProperty({ required: false })
    date: Date;
}
