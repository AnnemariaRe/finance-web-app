import { ApiProperty } from "@nestjs/swagger";

export class CreateAccountDto {
    @ApiProperty()
    title: string;
    @ApiProperty()
    accountType: string;
}
