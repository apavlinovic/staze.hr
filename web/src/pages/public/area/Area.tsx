import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

import Loading from '../../../common/core/loading/Loading';
import Error from '../../../common/core/error/Error';
import Distance from '../../../common/ui/field-renderers/distance/Distance';
import Duration from '../../../common/ui/field-renderers/duration/Duration';
import Map from '../../../common/core/map/Map';
import {
    ALL_TRAILS,
    HOUR_TRAILS_1,
    SHORT_TRAILS,
    HOUR_TRAILS_3,
} from './AreaTrailFilter';

import { Query, QueryAreaArgs, QueryTrailsArgs } from '../../../types';
import './Area.scss';

const AREA_QUERY = gql`
    query getAreaInformation(
        $areaSlug: String!
        $pageSize: Int!
        $offset: Int!
        $duration: String
        $distance: Int
    ) {
        area(areaSlug: $areaSlug) {
            id
            name
            slug
        }
        trails(
            mountain: $areaSlug
            pageSize: $pageSize
            offset: $offset
            duration: $duration
            distance: $distance
        ) {
            total
            items {
                id
                name
                duration
                distance
                slug
                startLocationCoords {
                    coordinates
                }
                endLocationCoords {
                    coordinates
                }
                gpxTrail {
                    trace
                }
            }
        }
    }
`;

function Mountain(props: WithTranslation) {
    const { t } = props;
    const { slug } = useParams<{
        slug: string;
    }>();

    const [page] = useState(0);
    const [pageSize] = useState(100);
    const [filter, setFilter] = useState(SHORT_TRAILS);

    const { loading, error, data } = useQuery<
        Query,
        QueryAreaArgs & QueryTrailsArgs
    >(AREA_QUERY, {
        variables: {
            areaSlug: slug,
            pageSize: pageSize,
            offset: page * pageSize,
            duration: filter.duration,
            distance: filter.distance,
        },
    });

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
        !data.area ||
        !data.trails.items ||
        data.trails.items.length === 0
    ) {
        return null;
    }

    const renderablePins = data.trails.items
        .filter((p) => p.startLocationCoords || p.endLocationCoords)
        .map((p) => {
            return {
                id: p.id,
                name: p.name,
                startCoords: p.startLocationCoords?.coordinates as number[],
                endCoords: p.endLocationCoords?.coordinates as number[],
                trace: p.gpxTrail ? JSON.parse(p.gpxTrail.trace) : null,
                duration: p.duration,
                distance: p.distance,
                url: p.slug,
            };
        });

    return (
        <div className="area--page">
            <div className="content-wrapper">
                <div className="sidebar">
                    <div
                        className="trails-header"
                        style={{
                            backgroundImage: `url(/mountains/${data?.area?.slug}.jpg)`,
                        }}
                    >
                        <h1 className="trail-name">
                            <span className="trail-text">
                                {data?.area?.name}
                                <span>
                                    {data?.trails?.total} {t('noun.trails')}
                                </span>
                            </span>
                        </h1>
                    </div>
                    <div className="trails-list">
                        <div className="filters">
                            <button onClick={() => setFilter(ALL_TRAILS)}>
                                {t('strings.all_trails')}
                            </button>
                            <button onClick={() => setFilter(SHORT_TRAILS)}>
                                {t('strings.short_trails')}
                            </button>
                            <button onClick={() => setFilter(HOUR_TRAILS_1)}>
                                {t('strings.duration_under', {
                                    hours: 1,
                                })}
                            </button>
                            <button onClick={() => setFilter(HOUR_TRAILS_3)}>
                                {t('strings.duration_under', {
                                    hours: 3,
                                })}
                            </button>
                        </div>

                        <ul className="trails">
                            <div className="header">
                                <li className="trail-name">
                                    <span className="trail-specs">
                                        {t('noun.name')}
                                    </span>
                                </li>
                                <li className="trail-distance">
                                    <span className="trail-specs">
                                        {t('noun.distance')}
                                    </span>
                                </li>
                                <li className="trail-duration">
                                    <span className="trail-specs">
                                        {t('noun.duration')}
                                    </span>
                                </li>
                            </div>
                            {data?.trails?.items.map((trail, index) => (
                                <div
                                    className="trail"
                                    key={`mountain-${index}`}
                                >
                                    <li className="trail-name">
                                        <Link to={`/trail/${trail.slug}`}>
                                            {trail.name}
                                        </Link>
                                    </li>
                                    <li className="trail-distance">
                                        <Distance distance={trail.distance} />
                                    </li>
                                    <li className="trail-duration">
                                        <Duration duration={trail.duration} />
                                    </li>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="map">
                    <Map trails={renderablePins} />
                </div>
            </div>
        </div>
    );
}

export default withTranslation()(Mountain);
