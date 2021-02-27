import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

import Loading from '../../../common/core/loading/Loading';
import Error from '../../../common/core/error/Error';
import Distance from '../../../common/ui/field-renderers/distance/Distance';
import Duration from '../../../common/ui/field-renderers/duration/Duration';
import { Hills } from '../../../common/ui/icons/Icons';
import Map from '../../../common/core/map/Map';

import { Query, QueryAreaArgs, QueryTrailsArgs } from '../../../types';
import './Area.scss';

const AREA_QUERY = gql`
    query getAreaInformation(
        $areaSlug: String!
        $pageSize: Int!
        $offset: Int!
    ) {
        area(areaSlug: $areaSlug) {
            id
            name
            slug
        }
        trails(mountain: $areaSlug, pageSize: $pageSize, offset: $offset) {
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

    const { loading, error, data } = useQuery<
        Query,
        QueryAreaArgs & QueryTrailsArgs
    >(AREA_QUERY, {
        variables: {
            areaSlug: slug,
            pageSize: pageSize,
            offset: page * pageSize,
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
        .filter(
            (p) =>
                !!p.startLocationCoords && !!p.startLocationCoords.coordinates,
        )
        .map((p) => {
            return {
                lat: p.startLocationCoords?.coordinates[0],
                long: p.startLocationCoords?.coordinates[1],
                title: p.name,
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
                            <Hills className="header-icon" />
                        </h1>
                    </div>
                    <div className="trails-list">
                        <div className="filters">
                            <button>{t('strings.all_trails')}</button>
                            <button>{t('strings.short_trails')}</button>
                            <button>
                                {t('strings.duration_over', {
                                    hours: 1,
                                })}
                            </button>
                            <button>
                                {t('strings.duration_over', {
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
                    <Map pins={renderablePins} />
                </div>
            </div>
        </div>
    );
}

export default withTranslation()(Mountain);
