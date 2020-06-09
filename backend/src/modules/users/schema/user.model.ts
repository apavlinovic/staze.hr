import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { AccountRole } from '../enums/accountRole';
import { AccountStatus } from '../enums/accountStatus';
import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
@Entity({
    name: 'users',
})
export class User {
    @Field((type) => Int)
    @PrimaryGeneratedColumn()
    userId: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column({
        length: 200,
    })
    email: string;

    @Field()
    @Column({
        length: 200,
    })
    username: string;

    @Field()
    @Column({
        length: 20,
    })
    nonce: string;

    @Field()
    @Column()
    passwordHash: string;

    @Field()
    @Column('text')
    description: string;

    @Field()
    @Column()
    registeredOn: Date;

    @Field()
    @Column()
    accountRole: AccountRole;

    @Field()
    @Column()
    accountStatus: AccountStatus;
}
