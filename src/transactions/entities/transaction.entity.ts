import { ApiProperty } from "@nestjs/swagger";
import { Account } from "src/accounts/entities/account.entity";
import { Category } from "src/categories/entities/category.entity";
import { OperationType } from "src/enums/OperationType";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    createdAt: Date;

    @ApiProperty()
    @Column({
        type: 'enum',
        enum: OperationType
      })
    operationType: OperationType;

    @ApiProperty()
    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    amount: number;

    @ApiProperty()
    @Column()
    date: Date;
    
    @ApiProperty()
    @ManyToOne(() => Account, account => account.transactions)
    account: number;

    @ApiProperty()
    @ManyToOne(() => Category, category => category.transactions)
    category: Category;
}

