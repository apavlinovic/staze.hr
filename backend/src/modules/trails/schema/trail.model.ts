import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';
import { GeoPoint } from '../../shared/schema/geoPoint';
import { Area } from '../../areas/schema/area.model';

@ObjectType()
@Entity({
    name: 'trails',
})
export class Trail {
    @Field((type) => Int)
    @PrimaryColumn()
    id: number;

    @Field()
    @Column()
    type: number;

    @Column()
    @Field()
    areaId: number;

    @ManyToOne(() => Area)
    @JoinColumn()
    @Field()
    area: Area;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column('text')
    description: string;

    @Field()
    @Column()
    slug: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    maintainer: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    duration: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
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

    @Field({ nullable: true })
    @Column({ nullable: true })
    gpxTraceId: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    gpxTraceUrl: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    mapName: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    originalMapUrl: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    startLocation: string;

    @Field({ nullable: true })
    @Column('geometry', {
        nullable: true,
        spatialFeatureType: 'Point',
        srid: 4326,
    })
    startLocationCoords: GeoPoint;

    @Field({ nullable: true })
    @Column({ nullable: true })
    endLocation: string;

    @Field({ nullable: true })
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
