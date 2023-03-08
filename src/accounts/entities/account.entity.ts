import { ApiProperty } from "@nestjs/swagger";
import { Account, AccountType, Prisma } from "@prisma/client";

export class AccountEntity implements Account {
    @ApiProperty()
    id: number;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    userId: number;
    @ApiProperty()
    title: string;
    @ApiProperty()
    balance: Prisma.Decimal;
    @ApiProperty()
    isActive: boolean;
    @ApiProperty()
    currency: string;
    @ApiProperty()
    accountType: AccountType;
}
