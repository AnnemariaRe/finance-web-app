import { ApiProperty } from "@nestjs/swagger";
import { OperationType } from "src/enums/OperationType";
import { Transaction } from "src/transactions/entities/transaction.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    createdAt: Date;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column({
        type: 'enum',
        enum: OperationType
      })
    operationType: OperationType;

    @ApiProperty()
    @ManyToOne(type => User, user => user.accounts, { nullable: true })
    user: User;

    @ApiProperty()
    @OneToMany(type => Transaction, transaction => transaction.category)
    transactions: Transaction;
}