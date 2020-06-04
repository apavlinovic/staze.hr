import { Entity, PrimaryColumn, Column, Timestamp } from 'typeorm';

@Entity({
    name: 'trails',
})
export class Trail {
    @PrimaryColumn()
    Id: string;

    @Column({
        nullable: false,
    })
    Name: string;

    @Column('text')
    Description: string;

    @Column()
    Type: string;

    @Column()
    Slug: string;

    @Column()
    Mountain: string;

    @Column()
    Maintainer: string;

    @Column()
    Duration: string;

    @Column()
    HeightDifference: string;

    @Column()
    RelatedInformationLink: string;

    @Column('decimal')
    Distance: number;

    @Column()
    HasValidGpx: boolean;

    @Column()
    GpxTraceId: string;

    @Column()
    GpxTraceUrl: string;

    @Column()
    MapName: string;

    @Column()
    OriginalMapUrl: string;

    @Column()
    StartLocation: string;

    @Column('geometry', {
        nullable: true,
        spatialFeatureType: 'Point',
        srid: 4326,
    })
    StartLocationCoords: object;

    @Column()
    EndLocation: string;

    @Column('geometry', {
        nullable: true,
        spatialFeatureType: 'Point',
        srid: 4326,
    })
    EndLocationCoords: object;

    @Column()
    ModifiedOn: Date;
}
