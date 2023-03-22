import { ApiProperty } from '@nestjs/swagger';
import { Account } from 'src/accounts/entities/account.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    createdAt: Date;

    @ApiProperty()
    @Column()
    updatedAt: Date;

    @ApiProperty()
    @Column()
    email: string;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    password: string;

    @ApiProperty()
    @OneToMany(() => Account, account => account.user)
    accounts: Account[];

    @ApiProperty()
    @OneToMany(() => Category, category => category.user)
    categories: Category[];
}
