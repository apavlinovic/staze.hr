import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { withTranslation, WithTranslation } from 'react-i18next';

import Loading from '../../../common/core/loading/Loading';
import Error from '../../../common/core/error/Error';
import { Query, QueryTrailArgs } from '../../../types';
import { Link, useParams } from 'react-router-dom';
import NoResults from '../../../common/ui/panels/no-results/NoResults';
import Coordinates from '../../../common/ui/field-renderers/coordinates/Coordinates';
import Duration from '../../../common/ui/field-renderers/duration/Duration';
import Distance from '../../../common/ui/field-renderers/distance/Distance';
import NearbyTrails from '../../../common/ui/nearby-trails/NearbyTrails';
import HeightDifference from '../../../common/ui/field-renderers/height-difference/HeightDifference';
import Card from '../../../common/ui/cards/card/Card';
import FullImageCard from '../../../common/ui/cards/full-image-card/FullImageCard';
import SEO from '../../../common/core/seo/SEO';
import { PinOnMap } from '../../../common/ui/icons/Icons';

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
            hasValidGpx
            gpxTraceId
            gpxTraceUrl
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
        <div className="page--trail">
            <SEO title={trail.name} description={trail.description}></SEO>

            <div className="grid grid-container">
                <div className="grid-item large-span-8 small-span-12 small-align-content-center">
                    <h1 className="small-text-align-center">{trail.name}</h1>
                    <ul className="inline-flexible-list with-vertical-separator margin-bottom-2x">
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

                    <p className="small-text-align-center">
                        {t('seo.trail_seo_description', {
                            name: trail.name,
                            distance: trail.distance,
                            startLocation: trail.startLocation,
                            endLocation: trail.endLocation,
                            duration: trail.duration,
                        })}
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

                {trail.mapName ? (
                    <div className="grid-item large-span-12 small-span-12">
                        <FullImageCard
                            useAutoHeight={true}
                            linkTo={`/trails/map/${trail.mapName}`}
                            imageUrl={`/trails/map/${trail.mapName}`}
                            imageAlt={trail.name}
                        />
                    </div>
                ) : null}

                <div className="grid-item large-span-6 small-span-12">
                    <Card header={'strings.trail_information'}>
                        <table className="margin-bottom-2x">
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
                    </Card>
                </div>

                {trail.gpxTraceId ? (
                    <div className="grid-item large-span-6 small-span-12">
                        <Card header={'noun.elevation_graph'}>
                            <img
                                className="invert-on-dark-mode"
                                src={`/trails/elevation/${trail.mapName}`}
                                alt={trail.name}
                            />
                        </Card>
                    </div>
                ) : null}

                <div className="grid-item large-span-6 small-span-12">
                    <FullImageCard
                        header={trail.area.name}
                        linkTo={`/area/${trail.area.slug}`}
                        imageUrl={`/mountains/${trail.area.slug}.jpg`}
                        imageAlt={trail.area.name}
                    />
                </div>

                {trail.gpxTraceId ? (
                    <div className="grid-item large-span-6 small-span-12">
                        <Card header="noun.gpx_trace">
                            <PinOnMap />
                            {t('strings.download_gpx_trace', {
                                gpxTraceId: trail.gpxTraceId,
                            })}
                        </Card>
                    </div>
                ) : null}

                <div className="grid-item large-span-12 small-span-12">
                    {trail.endLocationCoords && (
                        <NearbyTrails
                            header="strings.continue_the_trail"
                            description="strings.continue_the_trail_description"
                            geopoint={trail.endLocationCoords}
                        ></NearbyTrails>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withTranslation()(Trail);
