import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { AccountRole } from './enums/accountRole';
import { AccountStatus } from './enums/accountStatus';

@Entity({
    name: 'users',
})
export class User {
    @PrimaryGeneratedColumn()
    UserId: number;

    @Column()
    Name: string;

    @Column({
        length: 200,
    })
    Email: string;

    @Column({
        length: 200,
    })
    Username: string;

    @Column({
        length: 20,
    })
    Nonce: string;

    @Column()
    PasswordHash: string;

    @Column('text')
    Description: string;

    @Column()
    RegisteredOn: Date;

    @Column()
    AccountRole: AccountRole;

    @Column()
    AccountStatus: AccountStatus;
}
