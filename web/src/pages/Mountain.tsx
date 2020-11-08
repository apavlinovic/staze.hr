import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { withTranslation, WithTranslation } from 'react-i18next';

import Loading from '../common/core/loading/Loading';
import Error from '../common/core/error/Error';
import { Query, QueryAreaArgs } from '../types';
import { useParams } from 'react-router-dom';

const AREA_QUERY = gql`
    query getAreaInformation($areaSlug: String!) {
        area(areaSlug: $areaSlug) {
            id
            name
            slug
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
        </main>
    );
}

export default withTranslation()(Mountain);
