import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { withTranslation, WithTranslation } from 'react-i18next';

import Loading from '../common/core/loading/Loading';
import Error from '../common/core/error/Error';
import { Query, QueryAreaArgs } from '../types';
import { useParams } from 'react-router-dom';
import Card from '../common/ui/cards/card/Card';

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
            <h1>{data?.area?.name}</h1>
            <div className="grid">
                {data?.trails?.items.map((trail, index) => (
                    <div className="grid-item large-span-4 small-span-12">
                        <Card
                            key={`mountain-${index}`}
                            linkTo={`/trail/${trail.slug}`}
                            header={trail.name}
                        >
                            Duration: {trail.duration}
                        </Card>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default withTranslation()(Mountain);
