import { Entity, PrimaryColumn, Column } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
@Entity({
    name: 'trail_traces',
})
export class TrailTrace {
    @Field((type) => Int)
    @PrimaryColumn()
    trailId: number;

    @Field()
    @Column()
    trace: string;
}
