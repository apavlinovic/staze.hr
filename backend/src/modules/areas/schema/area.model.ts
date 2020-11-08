import { Entity, PrimaryColumn, Column } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
@Entity({
    name: 'areas',
})
export class Area {
    @Field((type) => Int)
    @PrimaryColumn()
    id: number;

    @Field()
    @Column()
    type: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column('text')
    description: string;

    @Field()
    @Column()
    slug: string;
}
