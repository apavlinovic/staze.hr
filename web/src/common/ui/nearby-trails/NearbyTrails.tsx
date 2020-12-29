import React from 'react';
import { GeoPoint, Query, QueryTrailsArgs } from '../../../types';
import { useQuery, gql } from '@apollo/client';
import Loading from '../../core/loading/Loading';
import Error from '../../core/error/Error';

import Duration from '../field-renderers/duration/Duration';
import Distance from '../field-renderers/distance/Distance';
import { WithTranslation, withTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import Card from '../cards/card/Card';
import ResponsiveImage from '../../core/responsive-image/ResponsiveImage';

interface NearbyTrailsProps {
    geopoint: GeoPoint;
    header?: string | undefined;
    description?: string | undefined;
}

const MAX_TRAILS_TO_RETURN = 3;
const NEARBY_DISTANCE_METERS = 500;

const NEARBY_TRAILS_QUERY = gql`
    query getNearbyTrails($nearby: DistanceFromGeoPointInput!) {
        trails(nearby: $nearby, pageSize: ${MAX_TRAILS_TO_RETURN}, offset: 0) {
            items {
                id
                name
                slug
                type
                mapName
                duration
                distance
                startLocation
                endLocation
            }
        }
    }
`;

function NearbyTrails(props: NearbyTrailsProps & WithTranslation) {
    const { geopoint, t, header, description } = props;
    const [lat, long] = geopoint.coordinates;

    const { loading, error, data } = useQuery<Query, QueryTrailsArgs>(
        NEARBY_TRAILS_QUERY,
        {
            variables: {
                nearby: {
                    distanceFromMeters: NEARBY_DISTANCE_METERS,
                    lat: lat,
                    long: long,
                },
            },
        },
    );

    if (loading) {
        return <Loading />;
    }

    if (error) {
        console.warn(error);
        return <Error error={error} />;
    }

    if (
        !data ||
        !data.trails ||
        !data.trails.items ||
        !data.trails.items.length
    ) {
        return null;
    }

    const { trails } = data;

    return (
        <div className="ui-nearby-trails">
            <Card header={header}>
                <p className="margin-bottom-2x">
                    {t('strings.continue_the_trail_description')}
                </p>
                <div className="grid">
                    {trails.items.map((trail) => {
                        return (
                            <div
                                className="grid-item large-span-4 small-span-12"
                                key={trail.id}
                            >
                                <NavLink
                                    to={trail.slug}
                                    className="body-color text-decoration-none"
                                >
                                    <h3>{trail.name}</h3>
                                    <ResponsiveImage
                                        imageUrl={`/trails/map/${trail.mapName}`}
                                        imageAlt={trail.name}
                                    ></ResponsiveImage>

                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>{t('noun.distance')}</th>
                                                <td>
                                                    <Distance
                                                        distance={
                                                            trail.distance
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>{t('noun.duration')}</th>
                                                <td>
                                                    <Duration
                                                        duration={
                                                            trail.duration
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    {t('noun.start_location')}
                                                </th>
                                                <td>{trail.startLocation}</td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    {t('noun.end_location')}
                                                </th>
                                                <td>{trail.endLocation}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </NavLink>
                            </div>
                        );
                    })}
                </div>
            </Card>
        </div>
    );
}

export default withTranslation()(NearbyTrails);
