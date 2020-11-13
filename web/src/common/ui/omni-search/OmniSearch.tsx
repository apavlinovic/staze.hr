import React, { useState } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { gql, ApolloError, useLazyQuery } from '@apollo/client';
import { TFunction } from 'i18next';
import { Link } from 'react-router-dom';

import { Query, QueryGlobalSearchArgs, SearchResult } from '../../../types';
import Loading from '../../core/loading/Loading';
import NoResults from '../panels/no-results/NoResults';
import InfoElement from '../panels/info-element/InfoElement';
import Error from '../../core/error/Error';
import MobileTransformable from '../../core/mobile-transformable/MobileTransformable';

import { FocusAware } from '../../core/focus-aware/FocusAware';

import './OmniSearch.scss';
import { ReactComponent as OmniSearchIcon } from './OmniSearchIcon.svg';
import { ReactComponent as MountainSearchIcon } from './MountainSearchIcon.svg';
import { ReactComponent as TrailSearchIcon } from './TrailSearchIcon.svg';
import Distance from '../field-renderers/distance/Distance';
import Duration from '../field-renderers/duration/Duration';

const SEARCH_QUERY = gql`
    query doSearch($query: String!) {
        globalSearch(query: $query) {
            results {
                id
                type
                text
                distance
                duration
                areaId
                areaName
                slug
            }
        }
    }
`;

function OmniSearch(props: WithTranslation) {
    const { t } = props;

    const [query, setQuery] = useState('');
    const [resultsVisible, setResultsVisible] = useState(false);

    const [doSearch, { error, loading, data }] = useLazyQuery<
        Query,
        QueryGlobalSearchArgs
    >(SEARCH_QUERY, {
        variables: {
            query,
        },
    });

    const onInputChangeHandler = (query: string) => {
        doSearch({
            variables: {
                query,
            },
        });

        setQuery(query);
        setResultsVisible(true);
    };

    const renderResultsPanel = (onResultClick: (query: string) => void) => {
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
                    onResultClick,
                )}
            </section>
        );
    };

    return (
        <FocusAware
            focusLostHandler={() => setResultsVisible(false)}
            focusGainedHandler={() => setResultsVisible(true)}
        >
            <MobileTransformable
                headerTitle="noun.search"
                openerIcon={<OmniSearchIcon />}
                content={(setDrawerOpen) => {
                    return (
                        <section className="common-omni-search">
                            <input
                                type="search"
                                onChange={(event) =>
                                    onInputChangeHandler(event.target.value)
                                }
                                placeholder={t('noun.search')}
                                value={query}
                            />

                            {renderResultsPanel((query) => {
                                setResultsVisible(false);
                                setDrawerOpen(false);

                                if (query) {
                                    setQuery('');
                                }
                            })}
                        </section>
                    );
                }}
            ></MobileTransformable>
        </FocusAware>
    );
}

function renderResults(
    error: ApolloError | undefined,
    loading: boolean,
    data: SearchResult[] | null | undefined,
    query: string,
    t: TFunction,
    onResultClick: Function,
) {
    if (loading) {
        return (
            <ul>
                <li>
                    <Loading />
                </li>
            </ul>
        );
    }

    if (error) {
        return (
            <ul>
                <li>
                    <Error error={error} />;
                </li>
            </ul>
        );
    }

    if (!data && !query) {
        return (
            <ul>
                <li>
                    <InfoElement message="strings.start_typing_to_search" />
                </li>
            </ul>
        );
    }

    if (!data) {
        return null;
    }

    if (data && data.length === 0) {
        return (
            <ul>
                <li>
                    <NoResults />
                </li>
            </ul>
        );
    }

    return (
        <ul>
            {data.map((value, index) =>
                renderResultItem(value, query, index, t, onResultClick),
            )}
        </ul>
    );
}

function renderResultItem(
    searchResult: SearchResult,
    query: string,
    index: number,
    t: TFunction,
    onResultClick: Function,
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
            resultTypeIdentifier = 'area';
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
            <Link
                to={`/${resultTypeIdentifier}/${searchResult.slug}`}
                className={resultTypeIdentifier}
                onClick={() => onResultClick(query)}
            >
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
                        {searchResult.areaName && (
                            <span> {searchResult.areaName}</span>
                        )}
                    </section>
                    <section className="secondary-information">
                        <ul className="inline-flexible-list with-vertical-separator">
                            <li>
                                <span>{t(resultTypeTitle)}</span>
                            </li>
                            <li>
                                <Distance
                                    distance={searchResult.distance}
                                ></Distance>
                            </li>
                            <li>
                                <Duration
                                    duration={searchResult.duration}
                                ></Duration>
                            </li>
                        </ul>
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

export default withTranslation()(OmniSearch);
