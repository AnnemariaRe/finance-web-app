import { ApiProperty } from "@nestjs/swagger";
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
    @Column()
    currency: string;

    @ApiProperty()
    @Column({
        type: 'enum',
        enum: AccountType
      })
    accountType: AccountType;

    @ApiProperty()
    @ManyToOne(type => User, user => user.accounts)
    user: User;

    @ApiProperty()
    @OneToMany(type => Transaction, transaction => transaction.account)
    transactions: Transaction;
}
