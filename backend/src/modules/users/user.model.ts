import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { AccountRole } from './enums/accountRole';
import { AccountStatus } from './enums/accountStatus';

@Entity({
    name: 'users',
})
export class User {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column()
    name: string;

    @Column({
        length: 200,
    })
    email: string;

    @Column({
        length: 200,
    })
    username: string;

    @Column({
        length: 20,
    })
    nonce: string;

    @Column()
    passwordHash: string;

    @Column('text')
    description: string;

    @Column()
    registeredOn: Date;

    @Column()
    accountRole: AccountRole;

    @Column()
    accountStatus: AccountStatus;
}
