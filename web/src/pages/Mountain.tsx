import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { withTranslation, WithTranslation } from 'react-i18next';

import Loading from '../common/core/loading/Loading';
import Error from '../common/core/error/Error';
import { Query } from '../types';
import { useParams } from 'react-router-dom';

const MOUNTAINS_QUERY = gql`
    query trails {
        mountains {
            name
            trails
        }
    }
`;

function Mountain(props: WithTranslation) {
    const { t } = props;
    const { mountain } = useParams<{
        mountain: string;
    }>();

    const { loading, error, data } = useQuery<Query>(MOUNTAINS_QUERY);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        console.warn(error);
        return <Error error={error} />;
    }

    return (
        <main>
            <h1>{t('noun.mountain')}</h1>
        </main>
    );
}

export default withTranslation()(Mountain);
