import { ApiProperty } from "@nestjs/swagger";
import { Currency } from "src/entities/currency.entity";
import { AccountType } from "src/enums/AccountType";
import { Transaction } from "src/entities/transaction.entity";
import { User } from "src/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Account {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty()
    @Column()
    title: string;

    @ApiProperty()
    @Column({ default: true })
    isActive: boolean;

    @ApiProperty()
    @Column({
        type: 'enum',
        enum: AccountType
      })
    accountType: AccountType;

    @ApiProperty({ type: () => User })
    @ManyToOne(() => User, user => user.accounts)
    user: User;

    @ApiProperty({ type: () => Currency })
    @ManyToOne(() => Currency, currency => currency.accounts)
    currency: Currency;

    @ApiProperty({ type: () => Transaction })
    @OneToMany(() => Transaction, transaction => transaction.account, { cascade: true })
    transactions: Transaction[];
}
