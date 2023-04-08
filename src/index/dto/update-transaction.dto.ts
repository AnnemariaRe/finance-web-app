import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Category } from 'src/categories/entities/category.entity';
import { CreateTransactionDto } from './create-transaction.dto';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
    @ApiProperty({ required: false })
    amount: number;
    @ApiProperty({ required: false })
    category: string;
    @ApiProperty({ required: false })
    date: Date;
}
