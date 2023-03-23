import { ApiProperty, PartialType } from '@nestjs/swagger';
import { OperationType } from 'src/enums/OperationType';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @ApiProperty({ required: false })
    name: string;

    @ApiProperty({ required: false })
    operationType: OperationType;
}
