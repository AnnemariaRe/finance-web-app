import { ApiProperty } from "@nestjs/swagger";
import { Account } from "src/accounts/entities/account.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Currency {
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
    @Column()
    code: string;

    @ApiProperty()
    @Column({ type: 'char', length: 1 })
    symbol: string;
    
    @ApiProperty()
    @OneToMany(() => Account, account => account.currency)
    accounts: Account[];
}
