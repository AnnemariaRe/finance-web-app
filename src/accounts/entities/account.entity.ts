import { ApiProperty } from "@nestjs/swagger";
import { Currency } from "src/currencies/entities/currency.entity";
import { AccountType } from "src/enums/AccountType";
import { Transaction } from "src/transactions/entities/transaction.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Account {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    createdAt: Date;

    @ApiProperty()
    @Column()
    title: string;

    @ApiProperty()
    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    balance: number;

    @ApiProperty()
    @Column({ default: true })
    isActive: boolean;

    @ApiProperty()
    @Column({
        type: 'enum',
        enum: AccountType
      })
    accountType: AccountType;

    @ApiProperty()
    @ManyToOne(() => User, user => user.accounts)
    user: User;

    @ApiProperty()
    @ManyToOne(() => Currency, currency => currency.accounts)
    currency: Currency;

    @ApiProperty()
    @OneToMany(() => Transaction, transaction => transaction.account)
    transactions: Transaction;
}
