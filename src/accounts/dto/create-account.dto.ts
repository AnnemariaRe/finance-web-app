import { ApiProperty } from "@nestjs/swagger";
import { AccountType, Prisma } from "@prisma/client";

export class CreateAccountDto {
    @ApiProperty()
    userId: number;
    @ApiProperty()
    title: string;
    @ApiProperty()
    balance: Prisma.Decimal;
    @ApiProperty()
    currency: string;
    @ApiProperty()
    accountType: AccountType;
}
