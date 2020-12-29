import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useQuery, gql } from '@apollo/client';
import { Query } from '../types';

import Loading from '../common/core/loading/Loading';
import Error from '../common/core/error/Error';
import FullImageCard from '../common/ui/cards/full-image-card/FullImageCard';

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
            <div className="grid">
                {data?.areas?.items.map((area, index) => (
                    <div className="grid-item large-span-4 small-span-12">
                        <FullImageCard
                            key={`mountain-${index}`}
                            linkTo={`/area/${area.slug}`}
                            header={area.name}
                            imageAlt={area.name}
                            imageUrl={`mountains/${area.slug}.jpg`}
                        ></FullImageCard>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default withTranslation()(MountainsPage);
