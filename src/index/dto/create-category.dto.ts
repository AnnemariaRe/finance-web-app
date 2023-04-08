import { ApiProperty } from "@nestjs/swagger";
import { OperationType } from "src/enums/OperationType";

export class CreateCategoryDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    operationType: OperationType;
}
