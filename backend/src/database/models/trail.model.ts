import { Entity, PrimaryColumn, Column } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export class Point {
    @Field()
    type: string;
    @Field((type) => [Number, Number])
    coordinates: Array<Number>;
}

@ObjectType()
@Entity({
    name: 'trails',
})
export class Trail {
    @Field((type) => Int)
    @PrimaryColumn()
    Id: number;

    @Field()
    @Column({
        nullable: false,
    })
    Name: string;

    @Field()
    @Column('text')
    Description: string;

    @Field()
    @Column()
    Type: string;

    @Field()
    @Column()
    Slug: string;

    @Field()
    @Column()
    Mountain: string;

    @Field()
    @Column()
    Maintainer: string;

    @Field()
    @Column()
    Duration: string;

    @Field()
    @Column()
    HeightDifference: string;

    @Field()
    @Column()
    RelatedInformationLink: string;

    @Field()
    @Column('decimal')
    Distance: number;

    @Field()
    @Column()
    HasValidGpx: boolean;

    @Field()
    @Column()
    GpxTraceId: string;

    @Field()
    @Column()
    GpxTraceUrl: string;

    @Field()
    @Column()
    MapName: string;

    @Field()
    @Column()
    OriginalMapUrl: string;

    @Field()
    @Column()
    StartLocation: string;

    @Field()
    @Column('geometry', {
        nullable: true,
        spatialFeatureType: 'Point',
        srid: 4326,
    })
    StartLocationCoords: Point;

    @Field()
    @Column()
    EndLocation: string;

    @Field()
    @Column('geometry', {
        nullable: true,
        spatialFeatureType: 'Point',
        srid: 4326,
    })
    EndLocationCoords: Point;

    @Field()
    @Column()
    ModifiedOn: Date;
}
