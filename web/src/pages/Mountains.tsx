import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useQuery, gql } from '@apollo/client';

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
    const { loading, error, data } = useQuery(MOUNTAINS_QUERY);

    console.log(loading, data, error);

    return <h1>Mountains</h1>;
}

export default withTranslation()(MountainsPage);
