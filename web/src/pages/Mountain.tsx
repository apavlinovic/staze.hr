import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { withTranslation, WithTranslation } from 'react-i18next';

import Loading from '../common/core/loading/Loading';
import Error from '../common/core/error/Error';
import { Query, QueryAreaArgs } from '../types';
import { useParams } from 'react-router-dom';
import Card from '../common/ui/cards/card/Card';
import './Mountain.scss';
import MountainSearchIcon from '../common/ui/omni-search/MountainSearchIcon.svg';

const AREA_QUERY = gql`
    query getAreaInformation($areaSlug: String!) {
        area(areaSlug: $areaSlug) {
            id
            name
            slug
        }
        trails(mountain: $areaSlug) {
            items {
                id
                name
                duration
                distance
                slug
                description
            }
        }
    }
`;

function Mountain(props: WithTranslation) {
    const { t } = props;
    const { slug } = useParams<{
        slug: string;
    }>();

    const { loading, error, data } = useQuery<Query, QueryAreaArgs>(
        AREA_QUERY,
        {
            variables: {
                areaSlug: slug,
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

    return (
        <main>
            <div className="trails-header">
                <img
                    className="header-background"
                    src={`/mountains/${data?.area?.slug}.jpg`}
                    alt=""
                ></img>

                <div className="trails-header-text">
                    <img
                        className="mountain-search"
                        src={MountainSearchIcon}
                        alt=""
                    />
                    <h1 className="trail-name">{data?.area?.name}</h1>
                </div>
            </div>

            <div className="trails-list">
                <div className="trails-table">
                    <h1>Trails in {data?.area?.name}</h1>
                    <hr></hr>
                    <div className="grid">
                        {data?.trails?.items.map((trail, index) => (
                            <div className="grid-item large-span-12 small-span-12">
                                <Card
                                    key={`mountain-${index}`}
                                    linkTo={`/trail/${trail.slug}`}
                                    header={trail.name}
                                >
                                    Description: {trail.description}
                                    <br></br>
                                    Duration: {trail.duration}
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="trail-picture">Neka slika</div>
            </div>
        </main>
    );
}

export default withTranslation()(Mountain);
