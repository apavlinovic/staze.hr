import React, { useState } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { gql, ApolloError, useLazyQuery } from '@apollo/client';
import { TFunction } from 'i18next';
import { Link } from 'react-router-dom';

import { Query, QueryGlobalSearchArgs, SearchResult } from '../../../types';
import Loading from '../../core/loading/Loading';
import Error from '../../core/error/Error';
import MobileTransformable from '../../core/mobile-transformable/MobileTransformable';
import {
    withLocationInjectedProps,
    withLocation,
} from '../../core/withLocation/withLocation';

import { FocusAware } from '../../core/focus-aware/FocusAware';

import './OmniSearch.scss';
import { ReactComponent as OmniSearchIcon } from './OmniSearchIcon.svg';
import { ReactComponent as MountainSearchIcon } from './MountainSearchIcon.svg';
import { ReactComponent as TrailSearchIcon } from './TrailSearchIcon.svg';

const SEARCH_QUERY = gql`
    query doSearch($query: String!, $nearTo: DistanceFromGeoPointInput) {
        globalSearch(query: $query, nearTo: $nearTo) {
            results {
                id
                type
                text
                distance
                duration
                area
                isNearby
            }
        }
    }
`;

const NEARBY_SEARCH_RADIUS_METERS = 10000;

function OmniSearch(props: WithTranslation & withLocationInjectedProps) {
    const { t, position } = props;

    const [query, setQuery] = useState('');
    const [resultsVisible, setResultsVisible] = useState(false);

    const [doSearch, { error, loading, data }] = useLazyQuery<
        Query,
        QueryGlobalSearchArgs
    >(SEARCH_QUERY, {
        variables: {
            query,
            nearTo: null,
        },
    });

    const onInputChangeHandler = (query: string) => {
        doSearch({
            variables: {
                query,
                nearTo: position
                    ? {
                          lat: position.coords.latitude,
                          long: position.coords.longitude,
                          distanceFromMeters: NEARBY_SEARCH_RADIUS_METERS,
                      }
                    : null,
            },
        });

        setQuery(query);
        setResultsVisible(true);
    };

    const results = () => {
        if (!resultsVisible) {
            return null;
        }

        return (
            <section className="results">
                {renderResults(
                    error,
                    loading,
                    data?.globalSearch?.results,
                    query,
                    t,
                )}
            </section>
        );
    };

    return (
        <FocusAware
            focusLostHandler={() => setResultsVisible(false)}
            focusGainedHandler={() => setResultsVisible(true)}
        >
            <section className="common-omni-search">
                <MobileTransformable
                    headerTitle="noun.search"
                    openerIcon={<OmniSearchIcon />}
                >
                    <input
                        type="search"
                        onChange={(event) =>
                            onInputChangeHandler(event.target.value)
                        }
                        placeholder={t('noun.search')}
                    />

                    {results()}
                </MobileTransformable>
            </section>
        </FocusAware>
    );
}

function renderResults(
    error: ApolloError | undefined,
    loading: boolean,
    data: SearchResult[] | null | undefined,
    query: string,
    t: TFunction,
) {
    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error error={error} />;
    }

    if (!data) {
        return null;
    }

    if (data && data.length === 0) {
        return (
            <ul>
                <li>{t('strings.no_results')}</li>
            </ul>
        );
    }

    return (
        <ul>
            {data.map((value, index) =>
                renderResultItem(value, query, t, index),
            )}
        </ul>
    );
}

function renderResultItem(
    searchResult: SearchResult,
    query: string,
    t: TFunction,
    index: number,
) {
    let resultTypeIdentifier = undefined;
    let resultTypeIcon = null;
    let resultTypeTitle = null;

    // TODO: Use proper backend types!
    switch (searchResult.type) {
        case 0:
            resultTypeIdentifier = 'trail';
            resultTypeTitle = 'noun.trail';
            resultTypeIcon = <TrailSearchIcon />;
            break;

        case 1:
            resultTypeIdentifier = 'mountain';
            resultTypeTitle = 'noun.mountain';
            resultTypeIcon = <MountainSearchIcon />;

            break;

        default:
            resultTypeIdentifier = 'unrecognized.searchresult';
            resultTypeTitle = 'unrecognized.searchresult';
            break;
    }

    return (
        <li
            key={`searchResult-${index}-${searchResult.type}-${searchResult.text}`}
        >
            <Link to="/" className={resultTypeIdentifier}>
                <aside>{resultTypeIcon}</aside>
                <main>
                    <section
                        className="title"
                        dangerouslySetInnerHTML={{
                            __html: highlightMatchedText(
                                query,
                                searchResult.text,
                            ),
                        }}
                    ></section>
                    <section className="secondary-information">
                        {searchResult.area && (
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: highlightMatchedText(
                                        query,
                                        searchResult.area,
                                    ),
                                }}
                            ></span>
                        )}
                    </section>
                    <section className="secondary-information">
                        <span>{t(resultTypeTitle)}</span>
                        {searchResult.distance && (
                            <span>{searchResult.distance}km</span>
                        )}

                        {searchResult.duration && (
                            <span>{searchResult.duration}h</span>
                        )}

                        {searchResult.isNearby && (
                            <span>{t('strings.nearby_result')}</span>
                        )}
                    </section>
                </main>
            </Link>
        </li>
    );
}

function highlightMatchedText(query: string, potentialMatch: string) {
    return potentialMatch.replace(
        new RegExp(`(${query})`, 'gi'),
        `<b class="match">$1</b>`,
    );
}

export default withTranslation()(withLocation(OmniSearch));
