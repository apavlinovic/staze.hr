import { Entity, PrimaryColumn, Column } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';
import { GeoPoint } from '../../shared/schema/geoPoint';

@ObjectType()
@Entity({
    name: 'trails',
})
export class Trail {
    @Field((type) => Int)
    @PrimaryColumn()
    id: number;

    @Field()
    @Column({
        nullable: false,
    })
    name: string;

    @Field()
    @Column('text')
    description: string;

    @Field()
    @Column()
    type: string;

    @Field()
    @Column()
    slug: string;

    @Field()
    @Column()
    mountain: string;

    @Field()
    @Column()
    maintainer: string;

    @Field()
    @Column()
    duration: string;

    @Field()
    @Column()
    heightDifference: string;

    @Field()
    @Column()
    relatedInformationLink: string;

    @Field()
    @Column('decimal')
    distance: number;

    @Field()
    @Column()
    hasValidGpx: boolean;

    @Field()
    @Column()
    gpxTraceId: string;

    @Field()
    @Column()
    gpxTraceUrl: string;

    @Field()
    @Column()
    mapName: string;

    @Field()
    @Column()
    originalMapUrl: string;

    @Field()
    @Column()
    startLocation: string;

    @Field()
    @Column('geometry', {
        nullable: true,
        spatialFeatureType: 'Point',
        srid: 4326,
    })
    startLocationCoords: GeoPoint;

    @Field()
    @Column()
    endLocation: string;

    @Field()
    @Column('geometry', {
        nullable: true,
        spatialFeatureType: 'Point',
        srid: 4326,
    })
    endLocationCoords: GeoPoint;

    @Field()
    @Column()
    modifiedOn: Date;
}
