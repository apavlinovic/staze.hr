import React from 'react';
import { GeoPoint, Query, QueryTrailsArgs } from '../../../types';
import { useQuery, gql } from '@apollo/client';
import Loading from '../../core/loading/Loading';
import Error from '../../core/error/Error';

import Duration from '../field-renderers/duration/Duration';
import Distance from '../field-renderers/distance/Distance';
import { WithTranslation, withTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

interface NearbyTrailsProps {
    geopoint: GeoPoint;
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
    const { geopoint, t } = props;
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

    if (!data || !data.trails) {
        return null;
    }

    const { trails } = data;

    return (
        <div className="ui-nearby-trails">
            <div className="grid">
                {trails.items.map((trail) => {
                    return (
                        <div
                            className="grid-item large-span-4 small-span-12"
                            key={trail.id}
                        >
                            <NavLink to={trail.slug}>
                                <h3>{trail.name}</h3>
                                <img
                                    className="reduce-contrast-on-dark-mode sepia-on-dark-mode"
                                    src={`/trails/map/${trail.mapName}`}
                                    alt={trail.name}
                                />

                                <table>
                                    <tbody>
                                        <tr>
                                            <th>{t('noun.distance')}</th>
                                            <td>
                                                <Distance
                                                    distance={trail.distance}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>{t('noun.duration')}</th>
                                            <td>
                                                <Duration
                                                    duration={trail.duration}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>{t('noun.start_location')}</th>
                                            <td>{trail.startLocation}</td>
                                        </tr>
                                        <tr>
                                            <th>{t('noun.end_location')}</th>
                                            <td>{trail.endLocation}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </NavLink>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default withTranslation()(NearbyTrails);
