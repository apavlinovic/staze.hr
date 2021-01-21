import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { withTranslation, WithTranslation } from 'react-i18next';

import Loading from '../../../common/core/loading/Loading';
import Error from '../../../common/core/error/Error';
import { Query, QueryAreaArgs, QueryTrailsArgs } from '../../../types';
import { Link, useParams } from 'react-router-dom';
import './Area.scss';

import { PinLocation } from '../../../common/ui/icons/Icons';
import Distance from '../../../common/ui/field-renderers/distance/Distance';
import Duration from '../../../common/ui/field-renderers/duration/Duration';
import HeightDifference from '../../../common/ui/field-renderers/height-difference/HeightDifference';

import Pagination from '../../../common/core/pagination/Pagination';
import Coordinates from '../../../common/ui/field-renderers/coordinates/Coordinates';

import { Hills } from '../../../common/ui/icons/Icons';

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
                description
                heightDifference
                startLocation
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

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);

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

    return (
        <div className="area--page">
            <div
                className="trails-header"
                style={{
                    backgroundImage: `url(/mountains/${data?.area?.slug}.jpg)`,
                }}
            >
                <h1 className="trail-name">
                    <Hills className="header-icon" />
                    <span className="trail-text">{data?.area?.name}</span>
                </h1>
            </div>
            <div className="content-wrapper">
                <div className="trails-list">
                    <h1 className="trail-title">
                        {data?.area?.name} — {data?.trails?.total}{' '}
                        {t('noun.trails')}{' '}
                    </h1>
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
                    <Pagination
                        total={data?.trails?.total}
                        initialPage={page}
                        onPageClicked={(page, pageSize) => {
                            setPage(page);
                        }}
                    />
                    <ul className="trails">
                        {data?.trails?.items.map((trail, index) => (
                            <div className="trail" key={`mountain-${index}`}>
                                <li>
                                    <Link to={`/trail/${trail.slug}`}>
                                        {trail.name}
                                    </Link>
                                </li>
                                <div className="trails-about">
                                    <li className="trail-distance">
                                        <Distance distance={trail.distance} />{' '}
                                        <br />
                                        <span className="trail-specs">
                                            {t('noun.distance')}
                                        </span>
                                    </li>
                                    <li className="trail-duration">
                                        <Duration duration={trail.duration} />{' '}
                                        <br />
                                        <span className="trail-specs">
                                            {t('noun.duration')}
                                        </span>
                                    </li>
                                    <li className="trail-height-difference">
                                        <HeightDifference
                                            difference={trail.heightDifference}
                                        />{' '}
                                        <br />
                                        <span className="trail-specs">
                                            {t('noun.height_difference')}
                                        </span>
                                    </li>
                                    <li className="trail-start">
                                        <span className="trail-specs">
                                            {t('noun.start_location')}
                                        </span>{' '}
                                        <br />
                                        <PinLocation className="trail-location-pin" />
                                        {trail.startLocation} (
                                        <Coordinates
                                            geopoint={trail.startLocationCoords}
                                        />
                                        )
                                    </li>
                                </div>
                            </div>
                        ))}
                    </ul>

                    <Pagination
                        total={data?.trails?.total}
                        initialPage={page}
                        onPageClicked={(page, pageSize) => {
                            setPage(page);
                        }}
                    />
                </div>
                <div className="map">Neka slika</div>
            </div>
        </div>
    );
}

export default withTranslation()(Mountain);
