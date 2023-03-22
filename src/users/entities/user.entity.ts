import { ApiProperty } from '@nestjs/swagger';
import { Account } from 'src/accounts/entities/account.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty()
    @UpdateDateColumn()
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
