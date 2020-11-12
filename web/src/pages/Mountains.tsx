import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useQuery, gql } from '@apollo/client';
import { Query } from '../types';

import Loading from '../common/core/loading/Loading';
import Error from '../common/core/error/Error';
import Card from '../common/ui/card/Card';
import '../common/ui/card/CardWrapper.scss';

const MOUNTAINS_QUERY = gql`
    query getAreas {
        areas(pageSize: 100, offset: 0) {
            items {
                id
                name
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
            TODO: FIGURE OUT A MOUNTAINS PAGE DESIGN
            <div className="cardWrapper">
                {data?.areas?.items.map((value, index) => (
                    <Card
                        key={`mountain-${index}`}
                        linkTo={`/area/${value.slug}`}
                    >
                        <img
                            className="cardPicture"
                            src={`/mountains/${value.slug}.jpg`}
                        />
                        {value.name}
                    </Card>
                ))}
            </div>
        </main>
    );
}

export default withTranslation()(MountainsPage);
