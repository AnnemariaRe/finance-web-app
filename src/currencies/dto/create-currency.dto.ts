import { ApiProperty } from "@nestjs/swagger";

export class CreateCurrencyDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    code: string;

    @ApiProperty()
    symbol: string;
}