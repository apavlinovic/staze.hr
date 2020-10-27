import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useQuery, gql } from '@apollo/client';
import { MountainWithTrailCount, Query } from '../types';

import Loading from '../common/loading/Loading';

const MOUNTAINS_QUERY = gql`
    query getMountains {
        mountains {
            name
            trails
        }
    }
`;

function MountainsPage(props: WithTranslation) {
    const { t } = props;
    const { loading, error, data } = useQuery<Query>(MOUNTAINS_QUERY);

    if (loading) {
        return <Loading />;
    }

    console.log(data?.mountains);

    return <h1>Mountains</h1>;
}

export default withTranslation()(MountainsPage);
