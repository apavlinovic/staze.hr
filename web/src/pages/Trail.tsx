import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { withTranslation, WithTranslation } from 'react-i18next';

import Loading from '../common/core/loading/Loading';
import Error from '../common/core/error/Error';
import { Query, QueryTrailArgs } from '../types';
import { Link, useParams } from 'react-router-dom';
import Tile from '../common/ui/tile/Tile';
import NoResults from '../common/ui/no-results/NoResults';
import Coordinates from '../common/ui/coordinates/Coordinates';
import Duration from '../common/ui/duration/Duration';
import Distance from '../common/ui/distance/Distance';
import HeightDifference from '../common/ui/height-difference/HeightDifference';
import Card from '../common/ui/card/Card';

const TRAIL_QUERY = gql`
    query getTrail($trailSlug: String!) {
        trail(trailSlug: $trailSlug) {
            id
            type
            name
            description
            slug
            area {
                slug
                name
            }
            mapName
            duration
            distance
            maintainer
            heightDifference
            relatedInformationLink
            originalMapUrl
            startLocation
            startLocationCoords {
                coordinates
            }
            endLocation
            endLocationCoords {
                coordinates
            }
        }
    }
`;

function Trail(props: WithTranslation) {
    const { t } = props;
    const { slug } = useParams<{
        slug: string;
    }>();

    const { loading, error, data } = useQuery<Query, QueryTrailArgs>(
        TRAIL_QUERY,
        {
            variables: {
                trailSlug: slug,
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

    if (data?.trail == null) {
        return <NoResults />;
    }

    const { trail } = data;

    return (
        <main>
            <div className="grid grid-container">
                <div className="grid-item large-span-8 small-span-12 small-align-content-center">
                    <h1 className="small-text-align-center">{trail.name}</h1>
                    <ul className="inline-flexible-list with-vertical-separator">
                        <li>
                            <Link to={`/area/${trail.area.slug}`}>
                                {trail.area.name}
                            </Link>
                        </li>

                        <li>
                            <Distance distance={trail.distance} />
                        </li>
                        <li>
                            <Duration duration={trail.duration} />
                        </li>
                        <li>
                            <HeightDifference
                                difference={trail.heightDifference}
                            />
                        </li>
                    </ul>

                    <hr />

                    <p className="small-text-align-center">
                        {trail.description}
                    </p>
                </div>

                <div className="grid-item large-span-4 small-span-12 align-content-right small-align-content-center">
                    <ul className="inline-flexible-list">
                        <li>
                            <button>Spremi</button>
                        </li>
                        <li>
                            <button>Karta</button>
                        </li>
                    </ul>
                </div>

                <div className="grid-item large-span-12 small-span-12">
                    <Card
                        variant="edge-to-edge-image"
                        isAbsoluteLink={true}
                        linkTo={`/trails/map/${trail.mapName}`}
                    >
                        <img
                            className="reduce-contrast-on-dark-mode sepia-on-dark-mode"
                            src={`/trails/map/${trail.mapName}`}
                            alt={trail.name}
                        />
                    </Card>
                </div>

                <div className="grid-item large-span-6 small-span-12">
                    <Tile header={'strings.trail_information'}>
                        <table>
                            <tbody>
                                <tr>
                                    <th>{t('noun.distance')}</th>
                                    <td>
                                        <Distance distance={trail.distance} />
                                    </td>
                                </tr>
                                <tr>
                                    <th>{t('noun.duration')}</th>
                                    <td>
                                        <Duration duration={trail.duration} />
                                    </td>
                                </tr>
                                <tr>
                                    <th>{t('noun.height_difference')}</th>
                                    <td>
                                        <HeightDifference
                                            difference={trail.heightDifference}
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
                                <tr>
                                    <th>{t('noun.mountain')}</th>
                                    <td>
                                        <Link to={`/area/${trail.area.slug}`}>
                                            {trail.area.name}
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <th>{t('noun.maintainer')}</th>
                                    <td>{trail.maintainer}</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>{t('strings.important_coordinates')}</h3>
                        <table>
                            <tbody>
                                <tr>
                                    <th>{t('noun.start_coordinates')}</th>
                                    <td>
                                        <Coordinates
                                            geopoint={trail.startLocationCoords}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>{t('noun.end_coordinates')}</th>
                                    <td>
                                        <Coordinates
                                            geopoint={trail.endLocationCoords}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <p>
                            <small>{t('strings.coordinates_disclaimer')}</small>
                        </p>
                    </Tile>
                </div>

                <div className="grid-item large-span-6 small-span-12">
                    <Tile
                        variant="edge-to-edge-image"
                        header={'noun.elevation_graph'}
                    >
                        <img
                            className="invert-on-dark-mode"
                            src={`/trails/elevation/${trail.mapName}`}
                            alt={trail.name}
                        />
                    </Tile>
                </div>
            </div>
        </main>
    );
}

export default withTranslation()(Trail);
