import { ApiProperty } from "@nestjs/swagger";

export class CreateTransactionDto {
    @ApiProperty()
    amount: number;
    @ApiProperty()
    date: Date;
}
