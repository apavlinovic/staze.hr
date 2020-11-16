import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useQuery, gql } from '@apollo/client';
import { Query } from '../types';

import Loading from '../common/core/loading/Loading';
import Error from '../common/core/error/Error';
import VerticalCard from '../common/ui/vertical-card/VerticalCard';

const MOUNTAINS_QUERY = gql`
    query getAreas {
        areas(pageSize: 100, offset: 0) {
            items {
                id
                name
                description
                slug
            }
        }
    }
`;

function MountainsPage(props: WithTranslation) {
    const { t } = props;
    const { loading, error, data } = useQuery<Query>(MOUNTAINS_QUERY);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error error={error} />;
    }

    return (
        <main>
            <h1>{t('noun.mountains')}</h1>
            <div className="cardWrapper">
                {data?.areas?.items.map((area, index) => (
                    <VerticalCard
                        key={`mountain-${index}`}
                        linkTo={`/area/${area.slug}`}
                        header={area.name}
                        imageUrl={`mountains/${area.slug}.jpg`}
                    >
                        {area.description}
                    </VerticalCard>
                ))}
            </div>
        </main>
    );
}

export default withTranslation()(MountainsPage);
